import React, { PureComponent } from 'react'
import NetworkCollapsed from './NetworkCollapsed'
import NetworkExpanded from './NetworkExpanded'


class Network extends PureComponent {
  constructor() {
    super()
    this.state = { collapsed: true }
  }

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

  click(e) {
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
