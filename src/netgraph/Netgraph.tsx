import { css, StyleSheet } from 'aphrodite/no-important'
import React, { PureComponent } from 'react'
import { graphql, QueryRenderer, ReadyState } from 'react-relay'
import environment from '../relay-env'
import { IKernel, IRelayNode } from '../types'
import Ensemble from './Ensemble'
import Network from './network/Network'

type SvgMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent>

interface INetgraphProps {
  kernel?: IKernel<IRelayNode>
}

type State = typeof initialState

const initialState = {
  transform: [1, 0, 0, 1, 0, 0],
}

class Netgraph extends PureComponent<INetgraphProps, State> {
  state = initialState
  private dragStartCoordinates: number[] | null = null

  dragStart(e: SvgMouseEvent) {
    const { transform } = this.state
    this.dragStartCoordinates = [
      e.screenX - transform[4], e.screenY - transform[5]]
  }

  drag(e: SvgMouseEvent) {
    if (!this.dragStartCoordinates) {
      return
    }

    const dragStartCoordinates = this.dragStartCoordinates
    const { screenX, screenY } = e

    this.setState((state) => {
      const { transform } = state
      return {
        transform: [
          transform[0], transform[1], transform[2], transform[3],
          screenX - dragStartCoordinates[0],
          screenY - dragStartCoordinates[1],
        ],
      }
    })
  }

  dragEnd() {
    this.dragStartCoordinates = null
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

  renderNetgraph({props}: ReadyState<INetgraphProps>) {
    if (!props || !props.kernel) {
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
          {ensembles.map((ens) => <Ensemble obj={ens} key={ens.id} />)}
          {networks.map((net) => <Network id={net.id} key={net.id} />)}
        </g>
      </svg>
    )
  }
}

const styles = StyleSheet.create({
  svg: {
    height: '100%',
    width: '100%',
  },
})

export default Netgraph
