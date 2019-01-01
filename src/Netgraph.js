import React, { PureComponent } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import environment from './relay-env.js'
import { StyleSheet, css } from 'aphrodite/no-important'
import Ensemble from './Ensemble'
import Network from './Network'


class Netgraph extends PureComponent {
  constructor() {
    super()
    this.state = {
      transform: [1, 0, 0, 1, 0, 0]
    }
    this._drag_start = null
  }

  dragStart(e) {
    const { transform } = this.state
    this._drag_start_coordinates = [
      e.screenX - transform[4], e.screenY - transform[5]]
  }

  drag(e) {
    if (!this._drag_start_coordinates) {
      return
    }

    const _drag_start_coordinates = this._drag_start_coordinates
    const { screenX, screenY } = e

    this.setState(state => {
      const { transform } = state
      return {
        transform: [
          transform[0], transform[1], transform[2], transform[3],
          screenX - _drag_start_coordinates[0],
          screenY - _drag_start_coordinates[1],
        ]
      }
    })
  }

  dragEnd(e) {
    this._drag_start_coordinates = null
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`subscription NetgraphSubscription {
          kernel { model {
            ensembles { id, ...Ensemble_obj },
            networks { id }
          } }
        }`}
        variables={{}}
        render={this.renderNetgraph.bind(this)} />
    )
  }

  renderNetgraph({error, props}) {
    if (!props) {
      // TODO spinner or something
      return <div>Loading...</div>
    }

    const { transform } = this.state
    const { ensembles, networks } = props.kernel.model
    return (
      <svg
        className={css(styles.svg)}
        onMouseDown={this.dragStart.bind(this)}
        onMouseMove={this.drag.bind(this)}
        onMouseUp={this.dragEnd.bind(this)}>
        <g style={{
          transform: `matrix(${transform.join(',')})`,
        }}>
          {ensembles.map(ens => <Ensemble obj={ens} key={ens.id} />)}
          {networks.map(net => <Network id={net.id} key={net.id} />)}
        </g>
      </svg>
    )
  }
}


const styles = StyleSheet.create({
  svg: {
    width: '100%',
    height: '100%',
  }
})

export default Netgraph
