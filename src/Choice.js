/**
 * @file a Choice chain
 * @exports Choice
 * @requires flipchain/ChainedMap
 * @requires fliplog
 */

const {ChainedMap, log} = require('./deps')

/**
 * @inheritdoc
 * @desc a choice used in Question
 * @type {ChainedMap}
 */
class Choice extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.extend([
      'type',
      'checked',
      'disabled',

      // value should be autoset from name + parent group
      // 'name',
      // 'value',

      'message',

      // use when expanding
      'key',

      // 'when',
      'validate',
    ])
  }

  /**
   * @desc enable a step when a callback returns true
   * @param  {Function} fn function that is bound to answers
   * @return {Choice} @chainable
   */
  when(fn) {
    fn = fn.bind(this, this.parent.parent.answers)
    fn.NAME = 'PROMPT-WHEN'
    log.data(this.parent).bold('PROMPT-WHEN').echo()
    return this.set('when', fn)
  }

  /**
   * @param  {*} value value of a choice
   * @return {Choice} @chainable
   */
  value(value) {
    return this.set('value', value)
  }

  /**
   * @param  {string} name decorates the name and the value to use . syntax
   * @return {Choice} @chainable
   */
  name(name) {
    this.set('name', name)
    if (!this.has('value')) this.value(this.parent.get('name') + '.' + name)
    return this
  }

  /**
   * @inheritdoc
   * @return {Object}
   */
  toConfig() {
    return this.entries()
  }

  // --- type
  // confirm() {}
  // input() {}
  // --- meta
  // disabled() {}
  // checked() {}
  // --- evts
  // when() {}
  // validate() {}
  // ---
}

module.exports = Choice
