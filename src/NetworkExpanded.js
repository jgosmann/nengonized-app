import React, { PureComponent } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import environment  from './relay-env'
import Ensemble from './Ensemble'


const query = graphql`
  subscription NetworkExpandedSubscription($id: ID!) {
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

class NetworkExpanded extends PureComponent {
  render() {
    const { id } = this.props
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{id}}
        render={this.renderNetworkExpanded.bind(this)} />
    )
  }

  renderNetworkExpanded({error, props}) {
    if (!props) {
      return <text x='10' y='50' textAnchor='middle'>Loading sub</text>
    }

    const net = props.kernel.node
    return (
      <g>
        {
          (net.ensembles
            ? net.ensembles.map(ens => <Ensemble obj={ens} key={ens.id} />)
            : <text x='10' y='50' textAnchor='middle'>Subload</text>)
        }
        <text x='10' y='100' textAnchor='middle'>{net.label}</text>
      </g>
    )
  }
}

export default NetworkExpanded
