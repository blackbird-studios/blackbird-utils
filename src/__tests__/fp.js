import {flow} from 'lodash/fp'

import {
  ensureArray,
  tap,
  reversed,
  removeProps,
  callWith,
  log,
  fmapWithKey,
  fmapValuesWithKey,
  feachWithKey,
  fflatMapWithKey,
  mapToObject,
  interleave,
} from '..'

describe('ensureArray()', () => {
  test('preserves array argument', () => {
    const argument = [1, 2, 3]
    const result = ensureArray(argument)
    expect(result).toEqual(argument)
  })

  test('wraps non-array argument as a single-element array', () => {
    const argument = 'b'
    const result = ensureArray(argument)
    expect(result).toEqual([argument])
  })
})

describe('tap()', () => {
  test('runs side effect', () => {
    let x
    const argument = 3
    tap(val => {
      x = val
    })(argument)
    expect(x).toEqual(argument)
  })

  test('returns its argument', () => {
    const doubleIt = flow(
      tap(() => 'IGNORED'),
      val => val * 2
    )
    const result = doubleIt(4)
    expect(result).toEqual(8)
  })
})

describe('reversed()', () => {
  test('reverses array argument', () => {
    const argument = [1, 2, 3]
    const result = reversed(argument)
    expect(result).toEqual([3, 2, 1])
  })

  test('doesn’t mutate original array', () => {
    const original = [1, 2, 3]
    reversed(original)
    expect(original).toEqual([1, 2, 3])
  })
})

describe('removeProps()', () => {
  test('accepts single non-array prop name', () => {
    const result = removeProps('a')({a: 1, b: 2})
    expect(result).toEqual({b: 2})
  })

  test('accepts array of prop names', () => {
    const result = removeProps(['a', 'b'])({a: 1, b: 2, c: 3})
    expect(result).toEqual({c: 3})
  })

  test('ignores nonexistent props', () => {
    const result = removeProps(['a', 'b'])({a: 1, c: 3})
    expect(result).toEqual({c: 3})
  })
})

describe('callWith()', () => {
  test('calls function with supplied arguments', () => {
    const result = callWith(1, 2)((a, b) => a + b)
    expect(result).toEqual(3)
  })
})

describe('log()', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterAll(() => {
    console.log.mockRestore()
  })

  afterEach(() => {
    console.log.mockClear()
  })

  test('logs to console under supplied key', () => {
    log('a')(1)
    expect(console.log).toHaveBeenCalledWith({a: 1})
  })
})

describe('fmapWithKey()', () => {
  test('passes values and keys of object to callback', () => {
    const result = fmapWithKey((value, key) => `${key}${value}`)({a: 1, b: 2})
    expect(result).toEqual(['a1', 'b2'])
  })

  test('passes values and keys of array to callback', () => {
    const result = fmapWithKey((value, key) => `${key}${value}`)(['a', 'b'])
    expect(result).toEqual(['0a', '1b'])
  })
})

describe('fmapValuesWithKey()', () => {
  test('passes values and keys of object to callback', () => {
    const result = fmapValuesWithKey((value, key) => `${key}${value}`)({
      a: 1,
      b: 2,
    })
    expect(result).toEqual({a: 'a1', b: 'b2'})
  })
})

describe('feachWithKey()', () => {
  test('passes values and keys of object to callback', () => {
    const array = []
    feachWithKey((value, key) => array.push(`${key}${value}`))({a: 1, b: 2})
    expect(array).toEqual(['a1', 'b2'])
  })

  test('passes values and keys of array to callback', () => {
    const array = []
    feachWithKey((value, key) => array.push(`${key}${value}`))(['a', 'b'])
    expect(array).toEqual(['0a', '1b'])
  })
})

describe('fflatMapWithKey()', () => {
  test('passes values and keys of object to callback', () => {
    const result = fflatMapWithKey((value, key) =>
      key !== 'c' ? [`${key}${value}`] : []
    )({a: 1, b: 2, c: 3})
    expect(result).toEqual(['a1', 'b2'])
  })

  test('passes values and keys of array to callback', () => {
    const result = fflatMapWithKey((value, key) =>
      key !== 2 ? [`${key}${value}`] : []
    )(['a', 'b', 'c'])
    expect(result).toEqual(['0a', '1b'])
  })
})

describe('mapToObject()', () => {
  test('passes values and keys of object to callback', () => {
    const result = mapToObject((value, key) => [
      `${key}${value}`,
      `${value}${key}`,
    ])({a: 1, b: 2})
    expect(result).toEqual({a1: '1a', b2: '2b'})
  })

  test('passes values and keys of array to callback', () => {
    const result = mapToObject((value, key) => [
      `${key}${value}`,
      `${value}${key}`,
    ])(['a', 'b'])
    expect(result).toEqual({'0a': 'a0', '1b': 'b1'})
  })
})

describe('interleave()', () => {
  test('interleaves supplied value between passed array elements', () => {
    const result = interleave(() => 'and then')(['a', 'b', 'c'])
    expect(result).toEqual(['a', 'and then', 'b', 'and then', 'c'])
  })

  test('callback receives following array element', () => {
    const result = interleave(
      ({following}) => `the next item will be ${following}`
    )(['a', 'b', 'c'])
    expect(result).toEqual([
      'a',
      'the next item will be b',
      'b',
      'the next item will be c',
      'c',
    ])
  })
})
