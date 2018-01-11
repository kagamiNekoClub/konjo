import Range from '../common/range'
import Point from '../common/point'
import Axes from '../common/axes'
import Base from './base'
import AABB from './aabb'
import Sphere from './sphere'

/**
 * Oriented bounding box class.
 *
 */
class OBB extends Base {
  get x () { return this._x }
  set x (value) {
    this._x = value
    this._create()
  }

  get y () { return this._y }
  set y (value) {
    this._y = value
    this._create()
  }

  get width () { return this._width }
  set width (value) {
    this._width = value
    this._create()
  }

  get height () { return this._height }
  set height (value) {
    this._height = value
    this._create()
  }

  get angle () { return this._angle }
  set angle (value) {
    this._angle = value
    this._create()
  }

  /**
   * The axes of this obb.
   *
   * @return {*}
   */
  get axes () { return this._axes }

  /**
   * The overall width range of this obb.
   * @return {Range}
   */
  get widthRange () { return this._widthRange }

  /**
   * The overall height range of this obb.
   * @return {Range}
   */
  get heightRange () { return this._heightRange }

  /**
   * The center point of this obb.
   * @return {Point}
   */
  get center () { return this._center }

  /**
   * Returns an oriented bounding box object.
   * @param {Number} [x=0] - The X coordinate of the upper-left corner of the obb.
   * @param {Number} [y=0] - The Y coordinate of the upper-left corner of the obb.
   * @param {Number} [width=0] - The width of this obb.
   * @param {Number} [height=0] - The height of this obb.
   * @param {Number} [angle=0] - The overall height of this obb.
   */
  constructor (x = 0, y = 0, width = 0, height = 0, angle = 0) {
    super()
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._angle = angle
    this._create()
  }

  _create () {
    this._center = new Point(this.x, this.y)
    this._axes = new Axes(this.center, this.angle)
    this._widthRange = new Range(-this.width / 2, this.width / 2)
    this._heightRange = new Range(-this.height / 2, this.height / 2)
  }

  /**
   * Get an array of point objects that span the four vertices of the obb.
   *
   * @return {Array<Point>}
   */
  points () {
    let axes = this.axes.reAxes()
    return [
      axes.point(new Point(this.width / 2, this.height / 2)),
      axes.point(new Point(-this.width / 2, this.height / 2)),
      axes.point(new Point(this.width / 2, -this.height / 2)),
      axes.point(new Point(-this.width / 2, -this.height / 2))
    ]
  }

  /**
   * Checks whether the point object given are contained within this obb.
   *
   * @param {Point} point - The point object of test.
   */
  pointCollision (point) {
    point = this.axes.point(point)
    return this.widthRange.hit(point.x) && this.heightRange.hit(point.y)
  }

  /**
   * Checks whether the aabb object given are contained within this obb.
   *
   * @param {AABB} aabb - The aabb object of test
   */
  aabbCollision (aabb) {
    if (this.angle % 90 === 0) {
      return this.obb2aabb().aabbCollision(aabb)
    } else {
      return this.obbCollision(aabb.aabb2obb())
    }
  }

  /**
   * Checks whether the obb object given are contained within this obb.
   *
   * @param {OBB} obb - The obb object of test
   */
  obbCollision (obb) {
    let obbInCenter = this.axes.point(obb.center)
    let inObbCenter = obb.axes.point(this.center)
    let owRange = new Range(obbInCenter.x - obb.width / 2, obbInCenter.x + obb.width / 2)
    let ohRange = new Range(obbInCenter.y - obb.height / 2, obbInCenter.y + obb.height / 2)
    let woRange = new Range(inObbCenter.x - this.width / 2, inObbCenter.x + this.width / 2)
    let hoRange = new Range(obbInCenter.y - this.height / 2, obbInCenter.y + this.height / 2)
    let wRangeCollision = this.widthRange.collision(owRange)
    let hRangeCollision = this.heightRange.collision(ohRange)
    let obbWidthRangeCollision = obb.widthRange.collision(woRange)
    let obbHeightRangeCollision = obb.heightRange.collision(hoRange)
    return wRangeCollision && hRangeCollision && obbWidthRangeCollision && obbHeightRangeCollision
  }

  /**
   * Checks whether the sphere object given are contained within this obb.
   *
   * @param {Sphere} sphere - The sphere object of test
   */
  sphereCollision (sphere) {
    return sphere.obbCollision(this)
  }

  /**
   * Transforms this object into a new AABB object and returns.
   *
   * @return {AABB}
   */
  obb2aabb () {
    let points = this.points()
    let maxX, maxY, minX, minY
    maxX = maxY = minX = minY = 0
    points.forEach((point) => {
      if (point.x > maxX) maxX = point.x
      if (point.x > minX) minX = point.x
      if (point.y > maxY) maxY = point.y
      if (point.y > minY) minY = point.y
    })
    return new AABB(minX, minY, maxX - minX, maxY - minY)
  }

  /**
   * Transforms this object into a new Sphere object and returns.
   *
   * @return {Sphere}
   */
  obb2sphere () {
    let radius = Math.ceil(Math.sqrt((this.width / 2) ** 2 + (this.height / 2) ** 2))
    return new Sphere(this.x, this.y, radius)
  }
}

export default OBB
