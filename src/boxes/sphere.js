import Range from '../common/range'
import Point from '../common/point'
import Vector2 from '../common/vector2'
import Base from './base'
import AABB from './aabb'
import OBB from './obb'

/**
 * Sphere box class.
 *
 */
class Sphere extends Base {
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

  get radius () { return this._radius }
  set radius (value) {
    this._radius = value
    this._create()
  }

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
   * Returns an sphere box object.
   * @param {Number} [x=0] - The X coordinate of the upper-left corner of the sphere.
   * @param {Number} [y=0] - The Y coordinate of the upper-left corner of the sphere.
   * @param {Number} [radius=0] - The width of this obb.
   */
  constructor (x = 0, y = 0, radius = 0) {
    super()
    this._x = x
    this._y = y
    this._radius = radius
    this._create()
  }

  _create () {
    this._widthRange = new Range(this.x - this.radius, this.x + this.radius)
    this._heightRange = new Range(this.y - this.radius, this.y + this.radius)
  }

  /**
   * Checks whether the point object given are contained within this sphere.
   *
   * @param {Point} point - The point object of test.
   */
  pointCollision (point) {
    return (point.x - this.x) ** 2 + (point.y - this.y) ** 2 <= this.radius ** 2
  }

  /**
   * Checks whether the aabb object given are contained within this sphere.
   *
   * @param {AABB} aabb - The aabb object of test
   */
  aabbCollision (aabb) {
    let sphereCenter2aabbCenter = (new Vector2(this.x, this.y)).sub(new Vector2(aabb.center.x, aabb.center.y)).abs()
    let aabbPoint = aabb.points[1]
    let aabbHalfLength = (new Vector2(aabbPoint.x, aabbPoint.y)).sub(new Vector2(aabb.center.x, aabb.center.y)).abs()
    let sphereCenter2aabb = sphereCenter2aabbCenter.sub(aabbHalfLength).max(0)
    return sphereCenter2aabb.dot() <= this.radius ** 2
  }

  /**
   * Checks whether the obb object given are contained within this sphere.
   *
   * @param {OBB} obb - The obb object of test
   */
  obbCollision (obb) {
    let point = obb.axes.point(new Point(this.x, this.y))
    let sphereCenter2obbCenter = (new Vector2(point.x, point.y)).sub(new Vector2(0, 0)).abs()
    let obbHalfLength = new Vector2(obb.width / 2, obb.height / 2)
    let sphereCenter2obb = sphereCenter2obbCenter.sub(obbHalfLength).max(0)
    return sphereCenter2obb.dot() <= this.radius ** 2
  }

  /**
   * Checks whether the sphere object given are contained within this sphere.
   *
   * @param {Sphere} sphere - The sphere object of test
   */
  sphereCollision (sphere) {
    return this.pointCollision(new Point(sphere.x, sphere.y))
  }

  /**
   * Transforms this object into a new AABB object and returns.
   *
   * @return {AABB}
   */
  sphere2aabb () {
    return new AABB(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
  }

  /**
   * Transforms this object into a new OBB object and returns.
   *
   * @return {OBB}
   */
  sphere2obb (angle = 0) {
    return new OBB(this.x, this.y, this.radius, this.radius, angle)
  }
}

export default Sphere
