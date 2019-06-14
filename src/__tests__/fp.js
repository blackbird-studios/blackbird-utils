import {ensureArray} from '..'

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
