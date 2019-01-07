import { shallow } from 'enzyme'
import 'jest'
import React, { PureComponent } from 'react'
import makePositionable, { IPositionableProps } from '../makePositionable'

class DummyComponent extends PureComponent<IPositionableProps> {
  render() {
    const { onMouseDown, onMouseMove, onMouseUp } = this.props
    return <g {...{onMouseDown, onMouseMove, onMouseUp}} />
  }
}

const PositionableComponent = makePositionable(DummyComponent)

function createDummyMouseEvent(x: number, y: number) {
  return {
    screenX: x,
    screenY: y,
    stopPropagation: () => undefined,
  }
}

describe('a component made positionable', function() {
  describe('initially', function() {
    it('renders the wrapped component at the top left corner', function() {
      const component = shallow(<PositionableComponent />)
      expect(component.containsMatchingElement(
        <DummyComponent x={0} y={0} />)).toBe(true)
    })
  })

  describe('when dragged', function() {
    it('renders the wrapped component at the new position', function() {
      const component = shallow(<PositionableComponent />)
      component.simulate('mouseDown', createDummyMouseEvent(0, 0))
      component.simulate('mouseMove', createDummyMouseEvent(1, 2))
      expect(component.containsMatchingElement(
        <DummyComponent x={1} y={2} />)).toBe(true)
      component.simulate('mouseUp', createDummyMouseEvent(1, 2))
      expect(component.containsMatchingElement(
        <DummyComponent x={1} y={2} />)).toBe(true)
    })
  })

  describe('when dragged out of limit area', function() {
    it('snaps back to be inside the limit area', function() {
      const component = shallow(
        <PositionableComponent minX={0} minY={0} maxX={1} maxY={1} />,
      )
      component.simulate('mouseDown', createDummyMouseEvent(0, 0))

      component.simulate('mouseMove', createDummyMouseEvent(-2, -2))
      expect(component.containsMatchingElement(
        <DummyComponent x={0} y={0} />)).toBe(true)

      component.simulate('mouseMove', createDummyMouseEvent(2, 2))
      expect(component.containsMatchingElement(
        <DummyComponent x={1} y={1} />)).toBe(true)
    })
  })
})
