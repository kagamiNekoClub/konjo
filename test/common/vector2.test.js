/* eslint-env jest */
import { Vector2 } from '../../src/main'

test('default x value of vector2 be 0', () => {
  expect(new Vector2().x).toBe(0)
})

test('#dot', () => {
  expect(new Vector2(-12, 12).dot(new Vector2(24, 12))).toBe(-144)
})

test('#cross', () => {
  expect(new Vector2(-12, 12).cross(new Vector2(24, 12))).toBe(-432)
})

test('#mod', () => {
  expect(new Vector2(-12, 12).mod()).toBe(Math.hypot(12, 12))
})

test('#abs', () => {
  expect(new Vector2(-12, 12).abs()).toMatchObject(new Vector2(12, 12))
})

test('#add', () => {
  expect(new Vector2(-12, 12).add(new Vector2(24, 12))).toMatchObject(new Vector2(12, 24))
})

test('#sub', () => {
  expect(new Vector2(-12, 12).sub(new Vector2(-2, 1))).toMatchObject(new Vector2(-10, 11))
})

test('#max', () => {
  expect(new Vector2(-12, 12).max(0)).toMatchObject(new Vector2(0, 12))
})

test('#min', () => {
  expect(new Vector2(-12, 12).min(0)).toMatchObject(new Vector2(-12, 0))
})
