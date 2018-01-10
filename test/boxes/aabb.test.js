/* eslint-env jest */
import {AABB, Point} from '../../src/main'

test('default x value of aabb be 0', () => {
  expect(new AABB().x).toBe(0)
})

test('get aabb points', () => {
  expect(new AABB(0, 0, 20, 20).points()).toEqual(
    expect.arrayContaining([
      new Point(0, 0),
      new Point(20, 0),
      new Point(0, 20),
      new Point(20, 20)
    ])
  )
})

test('did point hit', () => {
  expect(new AABB(0, 0, 20, 20).collision(new Point(12, 12))).toBe(true)
})

test('did point not hit', () => {
  expect(new AABB(0, 0, 20, 20).collision(new Point(-12, 12))).toBe(false)
})

test('did aabb hit', () => {
  expect(new AABB(0, 0, 20, 20).collision(new AABB(20, -12, 12, 20))).toBe(true)
})

test('did aabb not hit', () => {
  expect(new AABB(0, 0, 20, 20).collision(new AABB(-20, -12, 12, 12))).toBe(false)
})

test('did obb hit', () => {
  // TODO: add obb
})

test('did obb not hit', () => {
  // TODO: add obb
})

test('did sphere hit', () => {
  // TODO: add sphere
})

test('did sphere not hit', () => {
  // TODO: add sphere
})

test('#aabb2obb', () => {
  // TODO: add obb
})

test('#aabb2sphere', () => {
  // TODO: add sphere
})
