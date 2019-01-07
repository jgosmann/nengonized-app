import { Spinner } from '@blueprintjs/core'
import { shallow } from 'enzyme'
import 'jest'
import React from 'react'
import Ensemble from '../../Ensemble'
import Network from '../Network'
import NetworkContents from '../NetworkContents'

const props = {
  kernel: {
    node: {
      ensembles: [
        {id: 'ens1', label: 'ens1'},
        {id: 'ens2', label: 'ens2'},
      ],
      label: 'label',
      networks: [
        {id: 'net1'},
        {id: 'net2'},
      ],
    },
  },
}

const net_props = {
  height: 100,
  id: 'root',
  width: 100,
  x: 0,
  y: 0,
}

const bounds = {
  maxX: 100,
  maxY: 100,
  minX: 0,
  minY: 0,
}

const loadingProps = {
  kernel: undefined,
}

describe('NetworkContents', function() {
  describe('when loaded', function() {
    it('renders Ensembles', function() {
      const component = shallow(
        NetworkContents.renderNetworkContents(
          {error: null, props}, net_props),
      )
      expect(component.containsAllMatchingElements([
        <Ensemble {...bounds} />,
        <Ensemble {...bounds} />,
      ])).toBe(true)
    })

    it('renders Networks', function() {
      const component = shallow(
        NetworkContents.renderNetworkContents(
          {error: null, props}, net_props),
      )
      expect(component.containsAllMatchingElements([
        <Network id='net1' {...bounds} />,
        <Network id='net2' {...bounds} />,
      ])).toBe(true)
    })
  })

  describe('while loading', function() {
    it('renders a spinner', function() {
      const component = shallow(
        NetworkContents.renderNetworkContents({
          error: null,
          props: loadingProps,
        }, net_props),
      )
      expect(component.containsMatchingElement(<Spinner />)).toBe(true)
    })
  })
})
