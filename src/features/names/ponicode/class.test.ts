import * as _class from '../class'
describe('_class.Statistics.cardinality', () => {
  test('gives cardinality even if data is incorrect', () => {
    const result: any = _class.Statistics.cardinality({ key0: NaN, key1: NaN })
    expect(result).toBe(2)
  })

  test('Using valid object return number of keys', () => {
    const result: any = _class.Statistics.cardinality({
      key2: 1,
      key1: 1,
      key0: 100
    })
    expect(result).toBe(3)
  })

  test('Empty object return 0', () => {
    const result: any = _class.Statistics.cardinality({})
    expect(result).toBe(0)
  })
})

// @ponicode
describe('_class.Statistics.top10', () => {
  test('Empty objects is empty array', () => {
    const result: any = _class.Statistics.top10({})
    expect(result).toEqual([])
  })

  test('Single element return the same', () => {
    const result: any = _class.Statistics.top10({ key0: 1 })
    const object: any = [{ key0: 1 }]
    expect(result).toEqual(object)
  })

  test('Sort the keys in the object based in its value', () => {
    const result: any = _class.Statistics.top10({ key0: 0 })
    const object: any = [
      { key0: 100 },
      { key4: 100 },
      { key2: 5 },
      { key3: 1 },
      { key1: 1 }
    ]
    expect(result).toEqual(object)
  })
})
