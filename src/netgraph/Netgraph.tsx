import { Spinner } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite/no-important'
import React, { PureComponent } from 'react'
import { graphql, QueryRenderer, ReadyState } from 'react-relay'
import environment from '../relay-env'
import NetworkContents from './network/NetworkContents'

type SvgMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent>

interface INetgraphProps {
}

interface INetgraphSubscriptionProps {
  kernel?: {
    model: {
      id: string,
    },
  }
}

type State = typeof initialState

const initialState = {
  transform: [1, 0, 0, 1, 100, 100],
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
        query={graphql`
          subscription NetgraphSubscription { kernel { model { id } } }
        `}
        variables={{}}
        render={this.renderNetgraph.bind(this)} />
    )
  }

  renderNetgraph({props}: ReadyState<INetgraphSubscriptionProps>) {
    if (!props || !props.kernel) {
      // TODO spinner or something
      return <Spinner />
    }

    const { transform } = this.state
    return (
      <svg
        className={css(styles.svg)}
        onMouseDown={this.dragStart.bind(this)}
        onMouseMove={this.drag.bind(this)}
        onMouseUp={this.dragEnd.bind(this)}>
        <g style={{
          transform: `matrix(${transform.join(',')})`,
        }}>
          <NetworkContents id={props.kernel.model.id} />
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
