import React from 'react'
import ReactDOM from 'react-dom'
// import MultiCrops from 'react-multi-crops'
import MultiCrops from '../src/components/MultiCrops'
import img from './imgs/kumamon.jpg'


class App extends React.Component {
  state = {
    coordinates: [],
  }

  changeCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    })
  }
  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
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
          // onDrag={this.changeCoordinate}
          // onResize={this.changeCoordinate}
          // onDraw={this.changeCoordinate}
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
