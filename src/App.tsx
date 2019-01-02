import React, { PureComponent } from 'react'
import Netgraph from './netgraph/Netgraph'
import { query_ws, subscription_ws } from './relay-env'

interface IAppState {
    query_connection: number,
    subscription_connection: number
}

class App extends PureComponent<{}, IAppState> {
  constructor(props: Readonly<{}>) {
    super(props)
    query_ws.onopen = () => this.setState({ query_connection: 1 })
    query_ws.onclose = () => this.setState({ query_connection: 0 })
    subscription_ws.onopen = () => this.setState(
      { subscription_connection: 1 })
    subscription_ws.onclose = () => this.setState(
      { subscription_connection: 0 })
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
