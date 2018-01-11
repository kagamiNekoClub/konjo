/* eslint-env jest */
import { AABB, Point, OBB, Sphere } from '../../src/main'

test('default x value of aabb be 0', () => {
  expect(new OBB().width).toBe(0)
})

test('did point hit', () => {
  let obb = new OBB(0, 0, 20 * Math.SQRT2, 20 * Math.SQRT2, 45)
  expect(obb.collision(new Point(9, 9))).toBe(true)
})

test('did point not hit', () => {
  let obb = new OBB(0, 0, 20 * Math.SQRT2, 20 * Math.SQRT2, 45)
  expect(obb.collision(new Point(10, 10))).toBe(false)
})

test('did aabb hit', () => {
  expect(new OBB(0, 0, 20, 20, 45).collision(new AABB(-20, -20, 20, 20))).toBe(true)
})

test('did aabb not hit', () => {
  expect(new OBB(0, 0, 20, 20, 45).collision(new AABB(-20, -20, 10, 10))).toBe(false)
})

test('did obb hit', () => {
  expect(new OBB(0, 0, 20, 20, 30).collision(new OBB(0, 0, 10, 10, 45))).toBe(true)
})

test('did obb not hit', () => {
  expect(new OBB(0, 0, 20, 20, 45).collision(new OBB(-10, -10, 8, 8, 0))).toBe(false)
})

test('#obb2aabb', () => {
  let obb = new OBB(0, 0, 20 * Math.SQRT2, 20 * Math.SQRT2, 45)
  let aabb = new AABB(
    -20.000000000000004,
    -20.000000000000004,
    40.00000000000001,
    40.00000000000001)
  expect(obb.obb2aabb()).toMatchObject(aabb)
})

test('#obb2sphere', () => {
  let obb = new OBB(0, 0, 20, 20, Math.random())
  expect(obb.obb2sphere()).toMatchObject(new Sphere(0, 0, 10 * Math.SQRT2))
})
