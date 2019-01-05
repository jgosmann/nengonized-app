import { css } from 'aphrodite'
import React, { PureComponent } from 'react'
import NetworkContents from './NetworkContents'
import styles from './styles'

interface INetworkExpandedProps {
  id: string
  x: number
  y: number
  width: number
  height: number
}

class NetworkExpanded extends PureComponent<INetworkExpandedProps, {}> {
  render() {
    const { id, x, y, width, height } = this.props
    return (
      <g>
        <rect
          className={css(styles.rect)}
          x={x} y={y} width={width} height={height} />
        <NetworkContents id={id} />
      </g>
    )
  }
}

export default NetworkExpanded
