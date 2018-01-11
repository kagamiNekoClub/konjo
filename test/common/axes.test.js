/* eslint-env jest */
import {Point, Vector2, Axes} from '../../src/main'

test('#_in2Pi', () => {
  expect(Axes._in2Pi(0)).toBe(0)
  expect(Axes._in2Pi(100)).toBe(100)
  expect(Axes._in2Pi(360)).toBe(0)
  expect(Axes._in2Pi(-100)).toBe(260)
  expect(Axes._in2Pi(-360)).toBe(-0)
  expect(Axes._in2Pi(-420)).toBe(300)
  expect(Axes._in2Pi(420)).toBe(60)
})

test('#_sin', () => {
  expect(Axes._sin(0)).toBe(0)
  expect(Axes._sin(100)).toBe(Math.sin(100 * Math.PI / 180))
  expect(Axes._sin(405)).toBe(Math.SQRT2 / 2)
  expect(Axes._sin(-405)).toBe(-Math.SQRT2 / 2)
})

test('#_cos', () => {
  expect(Axes._cos(0)).toBe(1)
  expect(Axes._cos(100)).toBe(Math.cos(100 * Math.PI / 180))
  expect(Axes._cos(405)).toBe(Math.SQRT2 / 2)
  expect(Axes._cos(-405)).toBe(Math.SQRT2 / 2)
})

test('default x value of axes(degree=90) be vector2(0, 1)', () => {
  expect(new Axes(new Point(0, 0), 90).x).toMatchObject(new Vector2(0, 1))
})

test('default y value of axes(degree=0) be vector2(0, 0)', () => {
  expect(new Axes(new Point(0, 0), 0).y).toMatchObject(new Vector2(-0, 1))
})

test('#reAxes', () => {
  expect(new Axes(new Point(0, 0), 0).reAxes()).toMatchObject(new Axes(new Point(-0, -0), -0))
  expect(new Axes(new Point(1, -1), 90).reAxes()).toMatchObject(new Axes(new Point(-1, 1), -90))
})

test('#shadow', () => {
  let shadowVector1 = new Axes(new Point(0, 0), 0).shadow(new Vector2(1, -1))
  expect(shadowVector1).toMatchObject(new Vector2(1, -1))
  let shadowVector2 = new Axes(new Point(0, 0), 90).shadow(new Vector2(0, 1))
  expect(shadowVector2).toMatchObject(new Vector2(1, 0))
  expect(new Axes(new Point(0, 0), 45).shadow(new Vector2(1, 1)).mod()).toBe(Math.sqrt(2))
})

test('#point', () => {
  let shadowPint1 = new Axes(new Point(0, 0), 0).point(new Point(1, -1))
  expect(shadowPint1).toMatchObject(new Point(1, -1))
  let shadowPint2 = new Axes(new Point(0, 0), 90).point(new Point(0, 1))
  expect(shadowPint2).toMatchObject(new Point(1, 0))
})
