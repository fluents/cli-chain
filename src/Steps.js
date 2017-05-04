/**
 * @file a Step chain
 * @exports Steps
 * @requires flipchain/ChainedSet
 * @requires flipchain/ChainedMap
 */

const {ChainedMap, ChainedSet} = require('./deps')

/**
 * @TODO: instead of an array needs to return obj?
 * @type {ChainedSet}
 * @prop {ChainedSet} data
 * @type {ChainedMap}
 */
class Steps extends ChainedMap {
  constructor(parent) {
    super(parent)

    this.data = new ChainedSet(this)
  }
  add(value) {
    this.data.add(value)
    return this
  }
  toConfig() {
    return {
      steps: this.data.values().map(questions => questions.toConfig()),
    }
  }
}

module.exports = Steps
