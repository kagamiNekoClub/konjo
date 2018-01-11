/**
 * An object that represents a one-dimensional range.
 *
 */
class Range {
  /**
   * Returns an range object
   *
   * @param {Number} first - first value of range.
   * @param {Number} last - last value of range.
   * @constructor
   */
  constructor (first = 0, last = 0) {
    if (first > last) throw new Error('The first value must be less than the last value.')
    /**
     * @member {number}
     * @default 0
     */
    this.first = first
    /**
     * @member {number}
     * @default 0
     */
    this.last = last
  }

  /**
   * Checks whether the value given are contained within this range.
   *
   * @param {Number} value - The value of test.
   */
  hit (value) {
    return value > this.first && value < this.last
  }

  /**
   * Checks whether the range object given are contained within this range.
   * @param {Range} range - The range object of test.
   */
  collision (range) {
    return !(this.last < range.first || this.first > range.last)
  }
}

export default Range
