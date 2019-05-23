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

| Prop              | Description                                                  | Type                                     | Default |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------- | ------- |
| src               | Src of background image.                                     | string                                   | -       |
| coordinates       | An array of coordinate( see the table blew), {id, x, y, width, height}. | array                                    | []      |
| width             | Width of background image.                                   | number(in pixel)                         | -       |
| height            | Height of background image.                                  | number(in pixel)                         | -       |
| onDraw            | A callback which hanppends when a user starts drawing a new rectangle. | funtion(coordinate , index, coordinates) | -       |
| onDrag            | A callback which hanppends when  a user stars draging a exited rectangle. | funtion(coordinate , index, coordinates) | -       |
| onResize          | A callback which hanppends when a user starts resizing a exited rectangle. | funtion(coordinate , index, coordinates) | -       |
| onChange          | A callback which hanppends when a user starts drawing, draging or resizing a new/exited rectangle. | funtion(coordinate , index, coordinates) | -       |
| onDelete          | A callback which hanppends when a user delete a exited rectangle. | funtion(coordinate , index, coordinates) | -       |
| onLoad            | The callback is  triggered when the background image is loaded. | onLoad(e)                                | -       |
| permitAreaOverlap | If set to false prevent the overlap between crop areas       | boolean                                  | true    |


### coordinate

| Prop   | Description                                                  | Type             | Default |
| ------ | ------------------------------------------------------------ | ---------------- | ------- |
| id     | Unique between in coordinates array                          | string           | -       |
| x      | X coordinate  relative to left corner(0,0) of background image. From left to right, x will go up. | number(in pixel) | -       |
| y      | Y coordinate  relative to left corner(0,0) of background image. From top to bottom, y will go up. | number(in pixel) | -       |
| width  | Width of coordinate                                          | number(in pixel) | -       |
| height | Height of coordinate                                         | number(in pixel) | -       |

