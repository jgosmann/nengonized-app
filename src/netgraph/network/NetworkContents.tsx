import React, { PureComponent } from 'react'
import { graphql, QueryRenderer, ReadyState } from 'react-relay'
import { RelayEnvContext } from '../../context'
import { IKernel, INengoNetwork } from '../../types'
import Ensemble from '../Ensemble'

const query = graphql`
  subscription NetworkContentsSubscription($id: ID!) {
    kernel {
      node(id: $id) {
        ... on NengoNetwork {
          label,
          ensembles { ...Ensemble_obj }
        },
        id
      }
    }
  }
`

interface INetworkExpandedProps {
  id: string
  label?: string
  kernel?: IKernel<INengoNetwork>
}

class NetworkContents extends PureComponent<INetworkExpandedProps, {}> {
  static contextType = RelayEnvContext

  render() {
    const { id } = this.props
    return (
      <QueryRenderer
        environment={this.context}
        query={query}
        variables={{id}}
        render={this.renderNetworkContents.bind(this)} />
    )
  }

  renderNetworkContents({props}: ReadyState<INetworkExpandedProps>) {
    if (!props || !props.kernel) {
      return <text x='10' y='50' textAnchor='middle'>Loading sub</text>
    }

    const net = props.kernel.node
    return (
      <g>
        {
          (net.ensembles
            ? net.ensembles.map((ens) => <Ensemble obj={ens} key={ens.id} />)
            : <text x='10' y='50' textAnchor='middle'>Subload</text>)
        }
        <text x='10' y='100' textAnchor='middle'>{net.label}</text>
      </g>
    )
  }
}

export default NetworkContents
