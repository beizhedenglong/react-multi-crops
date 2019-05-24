import shortid from 'shortid'
import { map, assoc, omit } from 'ramda'

export const addid = map(assoc('id', shortid.generate()))

export const removeid = map(omit(['id']))

export const isOverlapping = (self, other) => {
  const left = self.x
  const right = self.x + self.width
  const top = self.y
  const bottom = self.y + self.height
  const otherleft = other.x
  const otherright = other.x + other.width
  const othertop = other.y
  const otherbottom = other.y + other.height
  return left <= otherright && right >= otherleft && top <= otherbottom && bottom >= othertop
}

export const areaNotAvailable = (coordinates, coordinate) => {
  let canContinue

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < coordinates.length; i++) {
    const element = coordinates[i]
    if (element.id === coordinate.id) {
      // eslint-disable-next-line no-continue
      continue
    }
    if (isOverlapping(element, coordinate)) {
      canContinue = element
      break
    }
  }
  return canContinue
}
