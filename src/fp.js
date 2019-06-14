import {map as fmap, each as feach, mapValues as fmapValues} from 'lodash/fp'
import {isArray} from 'lodash'

export const fmapWithKey = fmap.convert({cap: false})
export const fmapValuesWithKey = fmapValues.convert({cap: false})
export const feachWithKey = feach.convert({cap: false})

export const tap = callback => val => {
  callback(val)
  return val
}

// eslint-disable-next-line no-console
export const log = key => tap(val => console.log({[key]: val}))

export const reversed = arr => {
  const newArr = [...arr]
  newArr.reverse()
  return newArr
}

export const ensureArray = maybeArray =>
  isArray(maybeArray) ? maybeArray : [maybeArray]
