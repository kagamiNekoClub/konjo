import Point from './point'
import Vector2 from './vector2'

/**
 * An object that represents a two-dimensional coordinate system.
 *
 */
class Axes {
  /**
   * Returns a point of axes origin.
   *
   * @return {Point}
   */
  get origin () { return this._origin }
  set origin (value) { this._origin = value }

  /**
   * Returns the rotation angle of the coordinate system relative
   * to the original coordinate system.
   *
   * @return {Number}
   */
  get degree () { return this._degree }
  set degree (value) {
    this._degree = value
    this._setAxes()
  }

  /**
   * Returns x-axis vector2 of this axes.
   *
   * @return {Vector2}
   */
  get x () { return this._x }

  /**
   * Returns y-axis vector2 of this axes.
   *
   * @return {Vector2}
   */
  get y () { return this._y }

  /**
   * Returns new axes.
   *
   * @param  {Point} origin - The point of axes origin.
   * @param  {Number} degree - the rotation of the coordinate system relative
   * to the original coordinate system.
   */
  constructor (origin, degree) {
    this._origin = origin
    this._degree = degree
    this._setAxes()
  }

  static _cosTable () {
    return {
      0: 1,
      30: Math.sqrt(3),
      45: Math.SQRT2 / 2,
      60: 0.5,
      90: 0,
      120: -0.5,
      135: -Math.SQRT2 / 2,
      150: -Math.sqrt(3),
      180: -1
    }
  }

  static _sinTable () {
    return {
      0: 0,
      30: 0.5,
      45: Math.SQRT2 / 2,
      60: Math.sqrt(3),
      90: 1,
      120: Math.sqrt(3),
      135: Math.SQRT2 / 2,
      150: 0.5,
      180: 0
    }
  }

  static _in2Pi (value) {
    value = value % 360
    return value < 0 ? 360 + value : value
  }

  static _cos (degree) {
    let table = Axes._cosTable()
    degree = Axes._in2Pi(degree)
    if (table[degree % 180] !== void 0) {
      return degree > 180 ? -table[degree % 180] : table[degree]
    }
    return Math.cos(degree * Math.PI / 180)
  }

  static _sin (degree) {
    let table = Axes._sinTable()
    degree = Axes._in2Pi(degree)
    if (table[degree % 180] !== void 0) {
      return degree > 180 ? -table[degree % 180] : table[degree]
    }
    return Math.sin(degree * Math.PI / 180)
  }

  _setAxes () {
    this._x = new Vector2(Axes._cos(this._degree), Axes._sin(this._degree))
    this._y = new Vector2(-1 * Axes._sin(this._degree), Axes._cos(this._degree))
  }

  /**
   * Returns the inverse coordinate system of the current coordinate system.
   *
   * @return {Axes}
   */
  reAxes () {
    let origin = new Point(-this.origin.x, -this.origin.y)
    return new Axes(origin, -this.degree)
  }

  /**
   * Returns the projection of a vector2 in the current coordinate system.
   *
   * @param {Vector2} vector2 - The vector2.
   * @return {Vector2}
   */
  shadow (vector2) {
    let x = vector2.dot(this.x)
    let y = vector2.dot(this.y)
    return new Vector2(x, y)
  }

  /**
   * Returns the coordinate of the point in this axes.
   * @param {Point} point - The point.
   */
  point (point) {
    let vector2 = this.shadow(new Vector2(point.x - this.origin.x, point.y - this.origin.y))
    return new Point(vector2.x, vector2.y)
  }
}

export default Axes
