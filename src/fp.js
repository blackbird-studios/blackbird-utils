import {
  map as fmap,
  each as feach,
  mapValues as fmapValues,
  omit as fomit,
  flatMap as fflatMap,
  fromPairs as ffromPairs,
  flow,
} from 'lodash/fp'
import {isArray} from 'lodash'

export const fmapWithKey = fmap.convert({cap: false})
export const fmapValuesWithKey = fmapValues.convert({cap: false})
export const feachWithKey = feach.convert({cap: false})
export const fflatMapWithKey = fflatMap.convert({cap: false})

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

export const callWith = (...args) => func => func(...args)

export const removeProps = flow(
  ensureArray,
  fomit
)

export const mapToObject = toPair =>
  flow(
    fmapWithKey(toPair),
    ffromPairs
  )

export const interleave = getDivider =>
  fflatMapWithKey((value, index) =>
    index === 0 ? [value] : [getDivider({following: value}), value]
  )
