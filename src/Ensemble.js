import React, { PureComponent } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'


class Ensemble extends PureComponent {
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
  `
})
