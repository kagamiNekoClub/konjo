/* eslint-env jest */
import { AABB, Point, OBB, Sphere } from '../../src/main'

test('default x value of aabb be 0', () => {
  expect(new Sphere().x).toBe(0)
})

test('did point hit', () => {
  expect(new Sphere(0, 0, 20).collision(new Point(12, 12))).toBe(true)
})

test('did point not hit', () => {
  expect(new Sphere(0, 0, 10).collision(new Point(-12, 12))).toBe(false)
})

test('did aabb hit', () => {
  expect(new Sphere(0, 0, 20).collision(new AABB(-20, -20, 10, 10))).toBe(true)
})

test('did aabb not hit', () => {
  expect(new Sphere(0, 0, 14.142135623730).collision(new AABB(-20, -20, 10, 10))).toBe(false)
})

test('did obb hit', () => {
  expect(new Sphere(0, 0, 30).collision(new OBB(-20, -20, 10, 10, 45))).toBe(true)
})

test('did obb not hit', () => {
  expect(new Sphere(0, 0, 23.28427124746190).collision(new OBB(-20, -20, 10, 10, 45))).toBe(false)
})

test('did sphere hit', () => {
  expect(new Sphere(0, 0, 30).collision(new Sphere(-20, -20, 10))).toBe(true)
})

test('did sphere not hit', () => {
  expect(new Sphere(0, 0, 10.142135623730).collision(new Sphere(10, 10, 4))).toBe(false)
})

test('#sphere2aabb', () => {
  expect(new Sphere(0, 0, 20).sphere2aabb()).toMatchObject(new AABB(-20, -20, 40, 40))
})

test('#sphere2obb', () => {
  expect(new Sphere(0, 0, 20).sphere2obb()).toMatchObject(new OBB(0, 0, 40, 40, 0))
})
