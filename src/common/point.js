/**
 * The Point object represents a location in a two-dimensional coordinate system.
 * @memberof Konjo
 */
class Point {
    /**
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
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
     * Returns the distance between two points.
     * 
     * @param {Point} point - Anther point object
     * @return {Number}
     */
    distance (point) {
      return Math.hypot(this.x - point.x, this.y - point.y)
    }
  
    /**
     * Returns the analytic distance([xDistance, yDistance]) between two points.
     * `Math.pow(point.distanceAxis[0], 2) + Math.pow(point.distanceAxis[1], 2) == Math.pow(point.distance, 2)`
     * 
     * @param {Point} point - Anther point object
     * @return {Array<Number, Number>}
     */
    distanceAxis (point) {
      return [this.x - point.x, this.y - point.y]
    }
  }
  
  export default Point
  