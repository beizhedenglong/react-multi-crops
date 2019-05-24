import React, { Component } from 'react'
import { both, clone, is, complement, equals, map, addIndex } from 'ramda'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Crop, { coordinateType } from './Crop'
import { areaNotAvailable } from '../utils'

const isValidPoint = (point = {}) => {
  const strictNumber = number => both(
    is(Number),
    complement(equals(NaN)),
  )(number)
  return strictNumber(point.x) && strictNumber(point.y)
}


class MultiCrops extends Component {
  drawingIndex = -1

  pointA = {}

  id = shortid.generate()

  renderCrops = (props) => {
    const indexedMap = addIndex(map)
    return indexedMap((coor, index) =>
      (<Crop
        // improve performance when delet crop in middle array
        key={coor.id || index}
        index={index}
        coordinate={coor}
        {...props}
      />))(props.coordinates)
  }

  getCursorPosition = (e) => {
    const { left, top } = this.container.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  handleMouseDown = (e) => {
    const { coordinates } = this.props
    if (e.target === this.img || e.target === this.container) {
      const { x, y } = this.getCursorPosition(e)

      this.drawingIndex = coordinates.length
      this.pointA = { x, y }
      this.id = shortid.generate()
    }
  }


  handleMouseMove = (e) => {
    const {
      onDraw,
      onChange,
      coordinates,
      permitAreaOverlap,
    } = this.props

    const { pointA } = this
    if (isValidPoint(pointA)) {
      const pointB = this.getCursorPosition(e)

      // get the drawing coordinate
      const coordinate = {
        x: Math.min(pointA.x, pointB.x),
        y: Math.min(pointA.y, pointB.y),
        width: Math.abs(pointA.x - pointB.x),
        height: Math.abs(pointA.y - pointB.y),
        id: this.id,
      }

      const elementIntoArea = areaNotAvailable(coordinates, coordinate)

      if (!permitAreaOverlap && elementIntoArea) {
        coordinate.background = 'red'
        coordinate.zIndex = 1
      } else {
        coordinate.background = null
      }

      const nextCoordinates = clone(coordinates)
      nextCoordinates[this.drawingIndex] = coordinate
      if (is(Function, onDraw)) {
        onDraw(coordinate, this.drawingIndex, nextCoordinates)
      }
      if (is(Function, onChange)) {
        onChange(coordinate, this.drawingIndex, nextCoordinates)
      }
    }
  }

  handlMouseUp = () => {
    const { coordinates, onDraw, onChange } = this.props

    let deleteIndex
    let coordinate

    coordinates.forEach((element, index) => {
      if (element.id === this.id) {
        deleteIndex = index
        coordinate = element
      }
    })

    if (coordinate && coordinate.background === 'red') {
      coordinates.splice(deleteIndex, 1)

      const nextCoordinates = clone(coordinates)
      if (is(Function, onDraw)) {
        onDraw(coordinate, this.drawingIndex, nextCoordinates)
      }
      if (is(Function, onChange)) {
        onChange(coordinate, this.drawingIndex, nextCoordinates)
      }
    }

    this.pointA = {}
  }

  render() {
    const {
      src, width, height, onLoad,
    } = this.props
    // const { clicked } = this.state
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
        }}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handlMouseUp}
        ref={container => this.container = container}
      >
        <img
          ref={img => this.img = img}
          src={src}
          width={width}
          height={height}
          onLoad={onLoad}
          alt=""
          draggable={false}
        />
        {this.renderCrops(this.props)}

      </div>
    )
  }
}

const {
  string, arrayOf, number, func, bool,
} = PropTypes

MultiCrops.propTypes = {
  coordinates: arrayOf(coordinateType),
  src: string,
  width: number,
  height: number,
  onDraw: func,
  onChange: func,
  onLoad: func,
  permitAreaOverlap: bool,
}

MultiCrops.defaultProps = {
  coordinates: [],
  src: '',
  permitAreaOverlap: true,
}

export default MultiCrops

