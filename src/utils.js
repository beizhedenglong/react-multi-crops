import shortid from 'shortid'
import { map, assoc, omit } from 'ramda'

export const addid = map(assoc('id', shortid.generate()))

export const removeid = map(omit(['id']))
