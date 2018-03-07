# React Multi Crops

A multiple cropping component for React

[online demo](https://beizhedenglong.github.io/react-multi-crops/)

![kumamon](./examples/imgs/kumamon.gif)


## Installation
```
npm install react-multi-crops --save
```


## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import MultiCrops from 'react-multi-crops'
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
    return
        <MultiCrops
          src={img}
          width={1000}
          coordinates={this.state.coordinates}
          onChange={this.changeCoordinate}
          onDelete={this.deleteCoordinate}
        />
      </div>
  }
}


ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root'),
)

```

## Props


