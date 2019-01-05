import { css } from 'aphrodite'
import React, { PureComponent } from 'react'
import styles from './styles'

interface INetworkCollapsedProps {
  x: number
  y: number
  width: number
  height: number
}

class NetworkCollapsed extends PureComponent<INetworkCollapsedProps, {}> {
  render() {
    const { x, y, width, height } = this.props
    return (
      <rect
        className={css(styles.rect)}
        x={x} y={y} width={width} height={height} />
    )
  }
}

export default NetworkCollapsed
