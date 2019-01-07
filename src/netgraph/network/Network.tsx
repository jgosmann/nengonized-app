import React, { PureComponent } from 'react'
import makePositionable, { IPositionableProps } from '../makePositionable'
import NetworkCollapsed from './NetworkCollapsed'
import NetworkExpanded from './NetworkExpanded'

interface INetworkProps extends IPositionableProps {
  id: string
}

type State = typeof initialState

const initialState = {
  collapsed: true,
}

class Network extends PureComponent<INetworkProps, State> {
  state = initialState

  collapse() {
    this.setState({ collapsed: true })
  }

  expand() {
    this.setState({ collapsed: false })
  }

  toggleCollapsed() {
    if (this.state.collapsed) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  click() {
    this.toggleCollapsed()
  }

  render() {
    const { id, x, y, ...remainder } = this.props
    return (
      <g onDoubleClick={this.click.bind(this)} {...remainder} >{
        this.state.collapsed
          ? <NetworkCollapsed x={x} y={y} width={100} height={100} />
          : <NetworkExpanded id={id} x={x} y={y} width={100} height={100} />
      }</g>
    )
  }
}

export default makePositionable(Network)
