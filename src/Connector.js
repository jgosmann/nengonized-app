import React, { Component } from 'react'
import { hasWs, setWs } from './relay-env'


class Connector extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 'ws://localhost:8998/subscription'}
    this.ws_input = React.createRef()
  }

  connect_ws(e) {
    e.preventDefault()
    const ws = new WebSocket(this.state.value)
    ws.onopen = e => {
      setWs(ws)
      if (this.props.onWs) {
        this.props.onWs(hasWs())
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.connect_ws.bind(this)} >
        <input type="text" ref={this.ws_input} value={this.state.value}
          onChange={e => this.setState({value: e.target.value})} />
        <input type="submit" />
      </form>
    )
  }
}

export default Connector
