/**
 * @file a Question chain
 * @exports Question
 * @requires flipchain
 * @requires fliplog
 * @requires ./Choice
 */

const {
  ChainedSet,
  ChainedMap,
  toarr,
  inquirer,
  log,
  doesInclude,
} = require('./deps')
const Choice = require('./Choice')

/**
 * @prop {ChainedSet} _choices
 * @prop {Choice} current
 * @type {ChainedMap}
 */
class Question extends ChainedMap {

  /**
   * @param {ChainedMap | any} parent
   */
  constructor(parent) {
    super(parent)

    this.extend(['type', 'name', 'message', 'default', 'disabled'])
    this._choices = new ChainedSet(this)

    this.description = this.message.bind(this)
    // this.checked = this.default.bind(this)

    this.shorthandFactory(['checkbox', 'confirm', 'input', 'list', 'choice'])
    this.debug(false)
  }

  /**
   * @private
   * @since 0.0.6
   * @desc add choices using the shorthand factory
   * @param {string} type
   * @param {Array<string>} names
   * @param {string} msg
   * @return {Choice}
   */
  factory(type, names, msg) {
    const choice = new Choice(this).type(type).name(names)
    this.current = choice
    this._choices.add(choice)

    // maybe this is meant to be value. 0.0?
    let message = msg || names
    if (message) return choice.message(message)

    // const {name, value} = parent.entries()
    const parent = this.parent
    const current = parent.current

    if (current && current.has('name')) message = current.get('name')
    // else message = '.' + name

    return choice.message(message)
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {boolean} [checked=false]
   * @param {string} [msg] defaults to name
   * @return {Question} @chainable
   */
  checkbox(name, checked = false, msg) {
    this.factory('checkbox', name).checked(checked)
    if (msg) this.current.message(msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} [msg] defaults to name
   * @return {Question} @chainable
   */
  confirm(name, msg) {
    this.factory('confirm', name, msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} [msg] defaults to name
   * @return {Question} @chainable
   */
  input(name, msg) {
    this.factory('input', name, msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} [msg] defaults to name
   * @return {Question} @chainable
   */
  list(name, msg) {
    this.factory('list', name, msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} [msg] defaults to name
   * @return {Question} @chainable
   */
  choice(name, msg) {
    this.factory(null, name, msg)
    return this
  }

  /**
   * @since 0.0.8
   * @param {string} [msg='===']
   * @return {Question} @chainable
   */
  separator(msg = '===') {
    const separator = {
      toConfig() {
        return new inquirer.Separator(msg)
      },
    }
    this._choices.add(separator)
    return this
  }

  /**
   * @protected
   * @see Question.constructor
   * @desc adds shorthand methods using the factory
   * @param {Array<string>} list
   * @param {any} arg
   * @param {Function} fn
   * @return {Question} @chainable
   */
  shorthand(list, arg, fn) {
    toarr(list).forEach(data => this[fn](data, arg))
    return this
  }

  /**
   * @since 0.0.8
   * @description take single methods, add as multi methods
   * @example separator -> separators
   * @param  {Array<string>} methods methods to add `s` to and decorate Question
   * @return {Question} @chainable
   */
  shorthandFactory(methods) {
    methods.forEach(
      method =>
        (this[method + 's'] = (arg1, arg2) =>
          this.shorthand(arg1, arg2, method))
    )
    return this
  }

  /**
   * @since 0.0.8
   * @see Question._choices
   * @return {Object}
   */
  toConfig() {
    return Object.assign(this.entries(), {
      choices: this._choices.values().map(choice => choice.toConfig()),
    })
  }

  /**
   * @since 0.0.8
   * @TODO: chainedSet instead
   * @param {Function} fn
   * @return {Question} @chainable
   */
  when(fn) {
    fn = fn.bind(this, this.parent.answers)
    fn.NAME = 'QUESTION-WHEN'
    // log.data(this.parent).bold('QUESTION-WHEN').echo()

    return this.set('when', fn)
  }

  /**
   * @since 0.0.9
   * @desc
   *  when using two args, checks first arg as prop(s), second as does-include
   *  when using a single arg, it checks against last answer
   * @param {string | Array<string>} props
   * @param {string | Array<string>} [needles=null]
   * @return {Question} @chainable
   */
  whenIncl(props, needles = null) {
    let haystack
    let needle
    const debug = this.get('debug')

    function whenInc(answers) {
      // single and multi args
      if (needles === null) {
        needle = props

        // use the last key
        const keys = Object.keys(answers)
        haystack = keys[keys.length - 1]
      }
      else {
        needle = needles
        haystack = props
      }

      const propss = toarr(haystack)

      /**
       * @desc go through needles
       *       if they contain `!`, negate the result
       */
      let negated = false
      const needlez = toarr(needle).map(n => {
        if (n.includes('!') === true) {
          negated = true
          return n.replace('!', '')
        }
        return n
      })

      for (let i = 0; i < propss.length; i++) {
        const prop = propss[i]
        const val = answers[prop]

        log.data({prop, val, needlez}).text('does include props').echo(debug)

        /**
         * @desc
         *       when we have no value
         *       if negated, that is true
         *       otherwise, continue
         */
        if (val === undefined || typeof val.includes !== 'function') {
          if (negated === true) return true
          continue
        }

        const answerHas = doesInclude(val, needlez)

        /**
         * @desc
         * if negated,
         *    when answer has the value, that's false
         *  else if when negated,
         *    when answer does not have the value, that's correct!
         *  else,
         *    no negation, return if satisfied
         */
        if (negated === true && answerHas === true) return false
        else if (negated === true && answerHas === false) return true
        else if (answerHas === true) return true
      }
      return false
    }
    whenInc.NAME = 'QUESTION-WHEN-INC'
    // log.data(this.parent).bold('QUESTION-WHEN').echo()

    return this.set('when', whenInc.bind(this, this.parent.answers))
  }

  // @TODO: --- need more thought ---
  // list() {}
  // expand() {}
  // ---
  // editor() {}
  // password() {}
  // ---
  // autocompletion() {}

  // child(conditional) {
  //   // this.current.when
  //   return this
  // }
}

module.exports = Question
