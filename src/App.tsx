import { Spinner } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import React, { PureComponent } from 'react'
import { RelayEnvContext } from './context'
import Netgraph from './netgraph/Netgraph'
import environment, { init, query_ws, subscription_ws } from './relay-env'

interface IAppState {
    query_connection: number,
    subscription_connection: number
}

class App extends PureComponent<{}, IAppState> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      query_connection: 0,
      subscription_connection: 0,
    }
  }

  componentDidMount() {
    init()
    query_ws.onopen = () => this.setState({ query_connection: 1 })
    query_ws.onclose = () => this.setState({ query_connection: 0 })
    subscription_ws.onopen = () => this.setState(
      { subscription_connection: 1 })
    subscription_ws.onclose = () => this.setState(
      { subscription_connection: 0 })
  }

  render() {
    const { query_connection, subscription_connection } = this.state
    // TODO spinner or something
    return (
      <RelayEnvContext.Provider value={environment}>
        {
          (query_connection && subscription_connection)
            ? <Netgraph />
            : <Spinner intent='primary' className={css(styles.hvCenter)} />
        }
      </RelayEnvContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  hvCenter: {
    bottom: '50%',
    left: '50%',
    position: 'absolute',
    right: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

export default App
