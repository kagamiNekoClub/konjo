import Range from '../common/range'
import Point from '../common/point'
import Base from './base'
import OBB from './obb'
import Sphere from './sphere'

/**
 * Axis-aligned bounding box class.
 * @memberof Konjo
 */
class AABB extends Base {
  get x () { return this._x }
  set x (value) {
    if (this._x !== value) {
      this._x = value
      this._create()
    }
  }

  get y () { return this._y }
  set y (value) {
    if (this._y !== value) {
      this._y = value
      this._create()
    }
  }

  get width () { return this._width }
  set width (value) {
    if (this._width !== value) {
      this._width = value
      this._create()
    }
  }

  get height () { return this._height }
  set height (value) {
    if (this._height !== value) {
      this._height = value
      this._create()
    }
  }

  /**
   * The overall width range of this AABB.
   * @return {Range}
   */
  get widthRange () { return this._widthRange }

  /**
   * The overall height range of this AABB.
   * @return {Range}
   */
  get heightRange () { return this._heightRange }

  /**
   * The center point of this ABB.
   * @return {Point}
   */
  get center () { return this._center }

  /**
   * Returns a axis-aligned bounding box object.
   * @param {Number} [x=0] - The X coordinate of the upper-left corner of the AABB.
   * @param {Number} [y=0] - The Y coordinate of the upper-left corner of the AABB.
   * @param {Number} [width=0] - The overall width of this AABB.
   * @param {Number} [height=0] - The overall height of this AABB.
   */
  constructor (x = 0, y = 0, width = 0, height = 0) {
    super()
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._create()
  }

  _create () {
    this._widthRange = new Range(this.x, this.x + this.width)
    this._heightRange = new Range(this.y, this.y + this.height)
    this._center = new Point(this.x + this.width / 2, this.y + this.height / 2)
  }

  /**
   * Get an array of point objects that span the four vertices of the AABB.
   *
   * @return {Array<Point>}
   */
  points () {
    return [
      new Point(this.x, this.y),
      new Point(this.x + this.width, this.y),
      new Point(this.x, this.y + this.height),
      new Point(this.x + this.width, this.y + this.height)
    ]
  }

  /**
   * Checks whether the point object given are contained within this aabb.
   *
   * @param {Point} point - The point object of test.
   */
  pointCollision (point) {
    return this.widthRange.hit(point.x) && this.heightRange.hit(point.y)
  }

  /**
   * Checks whether the aabb object given are contained within this aabb.
   *
   * @param {AABB} aabb - The aabb object of test
   */
  aabbCollision (aabb) {
    let wRangeCollision = this.widthRange.collision(aabb.widthRange)
    let hRangeCollision = this.heightRange.collision(aabb.heightRange)
    return wRangeCollision && hRangeCollision
  }

  /**
   * Checks whether the obb object given are contained within this aabb.
   *
   * @param {OBB} obb - The obb object of test
   */
  obbCollision (obb) {
    return obb.obbCollision(this.aabb2obb)
  }

  /**
   * Checks whether the sphere object given are contained within this aabb.
   *
   * @param {Sphere} sphere - The sphere object of test
   */
  sphereCollision (sphere) {
    return sphere.aabbCollision(this)
  }

  aabb2obb () {
    return new OBB(this.center.x, this.center.y, this.width, this.height, 0)
  }

  aabb2sphere () {
    let radius = this.width > this.height ? this.width : this.height
    return new Sphere(this.center.x, this.center.y, radius)
  }
}

export default AABB
