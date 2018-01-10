class Base {
    /**
     * Collision detection. Will automatically determine the type of object and distributed to the corresponding detection function.
     * @param {Point|AABB|OBB|Sphere} obj
     */
  collision (obj) {
    let fnName = obj.constructor.name
    return this[fnName.toLowerCase() + 'Collision'](obj)
  }
  }

export default Base
