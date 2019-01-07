import { Spinner } from '@blueprintjs/core'
import React, { PureComponent } from 'react'
import { graphql, QueryRenderer, ReadyState } from 'react-relay'
import { RelayEnvContext } from '../../context'
import Ensemble from '../Ensemble'
import Network from './Network'

const query = graphql`
  subscription NetworkContentsSubscription($id: ID!) {
    kernel {
      node(id: $id) {
        ... on NengoNetwork {
          label,
          ensembles { id },
          networks { id }
        },
        id
      }
    }
  }
`

interface INetworkExpandedProps {
  id: string
  x?: number
  y?: number
  width?: number
  height?: number
}

interface INetworkExpandedSubscriptionProps {
  kernel?: {
    node: {
      label: string,
      ensembles: {id: string, label: string}[],
      networks: {id: string}[],
    },
  }
}

class NetworkContents extends PureComponent<INetworkExpandedProps, {}> {
  static contextType = RelayEnvContext

  static renderNetworkContents(
      {props}: ReadyState<INetworkExpandedSubscriptionProps>,
      positioning: INetworkExpandedProps) {
    if (!props || !(props as INetworkExpandedSubscriptionProps).kernel) {
      return <g><Spinner /></g>
    }

    const net = (props as INetworkExpandedSubscriptionProps).kernel!.node
    const { x, y, width, height } = positioning
    const bounds = {
      maxX: (typeof x !== 'undefined' && typeof width !== 'undefined')
        ? x + width : undefined,
      maxY: (typeof y !== 'undefined' && typeof height !== 'undefined')
        ? y + height : undefined,
      minX: x,
      minY: y,
    }
    return (
      <g>
        { net.ensembles.map((ens) => <Ensemble key={ens.id} {...bounds} />) }
        { net.networks.map((subnet) => <Network
          id={subnet.id} key={subnet.id} {...bounds} />) }
      </g>
    )
  }

  render() {
    const { id } = this.props
    return (
      <QueryRenderer
        environment={this.context}
        query={query}
        variables={{id}}
        render={(readyState: ReadyState<INetworkExpandedSubscriptionProps>) => {
          return NetworkContents.renderNetworkContents(readyState, this.props)
        }}
      />
    )
  }
}

export default NetworkContents
