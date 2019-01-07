import React, { ComponentType, PureComponent } from 'react'

type SvgMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent>
type MouseEventHandler = (e: SvgMouseEvent) => void

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Subtract<T, K> = Omit<T, keyof K>

export interface IPositionableProps {
  x: number,
  y: number,
  onMouseDown?: MouseEventHandler,
  onMouseMove?: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
}

export interface IBoundingBoxProps {
  minX?: number,
  minY?: number,
  maxX?: number,
  maxY?: number,
}

const initialState = {
  x: 0,
  y: 0,
}

function makePositionable<P extends IPositionableProps>(
    Wrapped: ComponentType<P>) {
  return class extends PureComponent<
      Subtract<P, IPositionableProps> & IBoundingBoxProps,
      typeof initialState> {
    static defaultProps = {
      maxX: Infinity,
      maxY: Infinity,
      minX: -Infinity,
      minY: -Infinity,
    }

    state = initialState
    private dragStartCoordinates: number[] | null = null

    render() {
      const { x, y } = this.state
      const { maxX, maxY, minX, minY, ...props } = (
        this.props as IBoundingBoxProps)
      return <Wrapped
        {...props}
        x={x} y={y}
        onMouseDown={this.dragStart.bind(this)}
        onMouseMove={this.drag.bind(this)}
        onMouseUp={this.dragEnd.bind(this)} />
    }

    dragStart(e: SvgMouseEvent) {
      e.stopPropagation()
      const { x, y } = this.state
      this.dragStartCoordinates = [e.screenX - x, e.screenY - y]
    }

    drag(e: SvgMouseEvent) {
      e.stopPropagation()
      if (!this.dragStartCoordinates) {
        return
      }

      const dragStartCoordinates = this.dragStartCoordinates
      const { minX, maxX, minY, maxY } = this.props as IBoundingBoxProps
      this.setState({
        x: this.clip(e.screenX - dragStartCoordinates[0], minX!, maxX!),
        y: this.clip(e.screenY - dragStartCoordinates[1], minY!, maxY!),
      })
    }

    dragEnd(e: SvgMouseEvent) {
      e.stopPropagation()
      this.dragStartCoordinates = null
    }

    private clip(x: number, low: number, high: number) {
      return Math.min(high, Math.max(low, x))
    }
  }
}

export default makePositionable
