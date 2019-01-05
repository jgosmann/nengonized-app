import { shallow } from 'enzyme'
import 'jest'
import React from 'react'
import NetworkCollapsed from '../NetworkCollapsed'

describe('NetworkCollapsed', function() {
  it('renders a rect with given size', function() {
    const component = shallow(
      <NetworkCollapsed x={0} y={0} width={100} height={100} />,
    )
    expect(component.containsMatchingElement(
      <rect x={0} y={0} width={100} height={100} />)).toEqual(true)
  })
})
