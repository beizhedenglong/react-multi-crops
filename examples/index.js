import React from 'react'
import ReactDOM from 'react-dom'
import { clone, remove } from 'ramda'
import MultiCrops, { addid, removeid } from '../build'
import img from './bg.jpeg'


class App extends React.Component {
  state = {
    coordinates: addid([
      {
        x: 0, y: 0, width: 100, height: 100,
      },
    ]),
  }

  changeCoordinate = (coordinate, index) => {
    const coordinates = clone(this.state.coordinates)

    coordinates[index] = coordinate
    // console.log(index)
    this.setState({
      coordinates,
    })
    console.log(removeid(this.state.coordinates))
  }
  deleteCoordinate = (coordinate, index) => {
    this.setState({
      coordinates: remove(index, 1)(this.state.coordinates),
    })
  }
  render() {
    return (
      <div style={{
        display: 'inline-block',
        position: 'relative',
      }}
      >
        <MultiCrops
          src={img}
          width={1000}
          coordinates={this.state.coordinates}
          onDrag={this.changeCoordinate}
          onResize={this.changeCoordinate}
          onDraw={this.changeCoordinate}
          onChange={this.changeCoordinate}
          onDelete={this.deleteCoordinate}
          // onLoad={e => console.log(e.target.height, e.target.width)}
        />
      </div>
    )
  }
}


ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root'),
)
