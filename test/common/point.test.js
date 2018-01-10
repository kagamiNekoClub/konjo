/* eslint-env jest */
import {Point} from '../../src/main'

test('default x value of point be 0', () => {
  expect(new Point().x).toBe(0)
})

test('distance between two points be 5', () => {
  let a = new Point(0, 3)
  let b = new Point(4, 0)
  expect(a.distance(b)).toBe(5)
})

test('distance between two points be [4, 3]', () => {
  let a = new Point(4, 3)
  let b = new Point(0, 0)
  expect(a.distanceAxis(b)).toEqual(
        expect.arrayContaining([4, 3])
    )
})
