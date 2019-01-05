import { shallow } from 'enzyme'
import 'jest'
import React from 'react'
import NetworkContents from '../NetworkContents'
import NetworkExpanded from '../NetworkExpanded'

describe('NetworkCollapsed', function() {
  const createNetworkExpanded = function() {
      return (
        <NetworkExpanded id='some-id' x={0} y={0} width={100} height={100} />
      )
  }

  it('renders a rect with given size', function() {
    const component = shallow(createNetworkExpanded())
    expect(component.containsMatchingElement(
      <rect x={0} y={0} width={100} height={100} />)).toEqual(true)
  })

  it('renders the network contents', function() {
    const component = shallow(createNetworkExpanded())
    expect(component.containsMatchingElement(
      <NetworkContents id='some-id' />)).toEqual(true)
  })
})
