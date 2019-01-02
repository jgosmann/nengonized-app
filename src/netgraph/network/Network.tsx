import React, { PureComponent } from 'react'
import NetworkCollapsed from './NetworkCollapsed'
import NetworkExpanded from './NetworkExpanded'

interface INetworkProps {
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
    return (
      <g onClick={this.click.bind(this)}>{
        this.state.collapsed
          ? <NetworkCollapsed />
          : <NetworkExpanded id={this.props.id} />
      }</g>
    )
  }
}

export default Network
