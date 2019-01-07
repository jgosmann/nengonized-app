import { css } from 'aphrodite'
import React, { PureComponent } from 'react'
import makePositionable, { IPositionableProps } from './makePositionable'
import styles from './styles'

interface IEnsembleProps extends IPositionableProps {
}

class Ensemble extends PureComponent<IEnsembleProps, {}> {
  render() {
    const { x, y, ...remainder } = this.props
    const width = 20
    const height = 20
    const radius = Math.min(width, height)
    return (
      <g {...remainder} >
        <circle className={css(styles.shape)} cx={x} cy={y} r={radius} />
      </g>
    )
  }
}

export default makePositionable(Ensemble)
