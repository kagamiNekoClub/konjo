/* eslint-env jest */
import { AABB, Point, OBB, Sphere } from '../../src/main'

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

test('#aabb2obb', () => {
  expect(new AABB(0, 0, 20, 20).aabb2obb()).toMatchObject(new OBB(10, 10, 20, 20, 0))
})

test('#aabb2sphere', () => {
  expect(new AABB(0, 0, 20, 20).aabb2sphere()).toMatchObject(new Sphere(10, 10, 20))
})
