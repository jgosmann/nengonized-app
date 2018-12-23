import React, { Component, Fragment } from 'react'
import './App.css'
import Connector from './Connector'
import { graphql, QueryRenderer } from 'react-relay'
import environment from './relay-env'


class App extends Component {
  constructor() {
    super()
    this.state = {ws: false}
  }

  renderApp() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`query AppQuery { model { ensembles { label } } }`}
        variables={{}}
        render={({error, props}) => {
          return props ? (
            <ul>
              {props.model.ensembles.map(ens => {
                return <li>{ens.label}</li>
              })}
            </ul>
          ) : <p>null</p>
        }} />
    )
  }

  render() {
    return (
      <Fragment>
        {this.state.ws
          ? this.renderApp()
          : <Connector onWs={v => this.setState({ws: v})} />}
        <p>Ws: {this.state.ws}</p>
      </Fragment>
    )
  }
}

export default App
