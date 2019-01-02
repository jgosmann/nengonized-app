import React, { PureComponent } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { INengoEnsemble } from '../types'

interface IEnsembleProps {
  obj: INengoEnsemble
}

class Ensemble extends PureComponent<IEnsembleProps, {}> {
  render() {
    const { label } = this.props.obj
    return <text x='10' y='10' textAnchor='middle'>{label}</text>
  }
}

export default createFragmentContainer(Ensemble, {
  obj: graphql`
    fragment Ensemble_obj on NengoEnsemble {
      label
    }
  `,
})
