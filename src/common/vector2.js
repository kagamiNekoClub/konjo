/**
 * Primary Vector class. Uses Array type for axis storage.
 *
 * @memberof Konjo
 */
class Vector2 {
  /**
   * Return a two-dimensional vector object.
   *
   * @param {Number} x The x component of this Vector2
   * @param {Number} y The y component of this Vector2
   */
  constructor (x = 0, y = 0) {
    /**
     * @member {number}
     * @default 0
     */
    this.x = x
    /**
     * @member {number}
     * @default 0
     */
    this.y = y
  }

  /**
   * Returns the dot product of this vector by another.
   *
   * @param   {Vector2} vector2 - Anther vector2.
   * @return  {Number}
   */
  dot (vector2 = this) {
    return this.x * vector2.x + this.y * vector2.y
  }

  /**
   * Returns the cross product of this vector by another.
   *
   * @param   {Vector2} vector2 - Anther vector2.
   * @return  {Number}
   */
  cross (vector2 = this) {
    return this.x * vector2.y - this.y * vector2.x
  }

  /**
   * Returns vector2 mode.
   *
   * @return {Number}
   */
  mod () {
    return Math.hypot(this.x, this.y)
  }

  /**
   * Returns vector2 absolute.
   * @return {Vector2}
   */
  abs () {
    return new Vector2(Math.abs(this.x), Math.abs(this.y))
  }

  /**
   * Add the provided Vector to this one.
   *
   * @param {Vector2} vector2 - Anther vector2.
   * @return {Vector2}
   */
  add (vector2) {
    return new Vector2(this.x + vector2.x, this.y + vector2.y)
  }

  /**
   * Subtract the provided vector from this one.
   *
   * @param {Vector2} vector2 - Anther vector2.
   * @return {Vector2}
   */
  sub (vector2) {
    return new Vector2(this.x - vector2.x, this.y - vector2.y)
  }

  /**
   * Returns a new vector2 so that each component of the new vector2 has a value greater
   * than or equal to the specified value.
   *
   * @param {Number} value - The specified value.
   * @return {Vector2}
   */
  max (value) {
    return new Vector2((this.x > value ? this.x : value), (this.y > value ? this.y : value))
  }

  /**
   * Returns a new vector2 so that the value of each component of the new vector2 is less
   * than or equal to the specified value.
   *
   * @param {Number} value - The specified value.
   * @return {Vector2}
   */
  min (value) {
    return new Vector2((this.x < value ? this.x : value), (this.y < value ? this.y : value))
  }
}

export default Vector2
