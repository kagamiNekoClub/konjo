import Point from './point'
import Vector2 from './vector2'

/**
 * An object that represents a two-dimensional coordinate system.
 *
 * @memberof Konjo
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
  get radian () { return this._radian }
  set radian (value) {
    this._radian = value
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
   * @param  {Number} radian - the rotation of the coordinate system relative
   * to the original coordinate system.
   */
  constructor (origin, radian) {
    this._origin = origin
    this._radian = radian
    this._setAxes(radian)
  }

  _setAxes () {
    this._x = new Vector2(Math.cos(this._radian), Math.sin(this._radian))
    this._y = new Vector2(-1 * Math.sin(this._radian), Math.cos(this._radian))
  }

  /**
   * Returns the inverse coordinate system of the current coordinate system.
   *
   * @return {Axes}
   */
  reAxes () {
    let origin = new Point(-this.origin.x, -this.origin.y)
    return new Axes(origin, -this.radian)
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
