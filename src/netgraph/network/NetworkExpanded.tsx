import { css } from 'aphrodite'
import React, { PureComponent } from 'react'
import styles from '../styles'
import NetworkContents from './NetworkContents'

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
    const bounds = { x, y, width, height }
    return (
      <g>
        <rect
          className={css(styles.shape)}
          {...bounds} />
        <NetworkContents id={id} {...bounds} />
      </g>
    )
  }
}

export default NetworkExpanded
