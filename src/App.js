import React, { PureComponent } from 'react'
import Netgraph from './Netgraph'
import { query_ws, subscription_ws } from './relay-env'


class App extends PureComponent {
  constructor() {
    {
    super()
    query_ws.onopen = () => this.setState({ query_connection: true })
    query_ws.onclose = () => this.setState({ query_connection: false })
    subscription_ws.onopen = () => this.setState(
      { subscription_connection: true })
    subscription_ws.onclose = () => this.setState(
      { subscription_connection: false })
    this.state = {
      query_connection: query_ws.readyState,
      subscription_connection: subscription_ws.readyState,
    }
  }

  render() {
    const { query_connection, subscription_connection } = this.state
    // TODO spinner or something
    return (
      (query_connection && subscription_connection)
        ? <Netgraph />
        : <div>Waiting for connection</div>
    )
  }
}

export default App
