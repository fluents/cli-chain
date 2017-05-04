/**
 * @file core of cli-chain
 * @exports Core
 * @requires flipchain/ChainedMap
 * @requires flipchain/ChainedSet
 * @requires fliplog
 * @requires ./Steps
 * @requires ./Program
 * @requires ./Question
 * @requires ./Choice
 */

const {ChainedMap, ChainedSet, log} = require('./deps')
const Program = require('./Program')
const Stepper = require('./Stepper')
const Steps = require('./Steps')
const Question = require('./Question')
const Choice = require('./Choice')

/**
 * @example
 * story (name, is usable for multiple stories to run)
 *  step (name, type = checkboxes)
 *    group
 *      input (type = checkbox, input, confirm)
 *      input
 *    group
 *      input
 *      step (this is where it gets tricky eh)
 *        group
 *          input
 *
 *  step
 *    group...
 *
 * @prop {ChainedSet<string, Function>} answerCallbacks callbacks to call for each answer
 * @prop {Stepper} stepper steps through the steps 1 by 1
 * @prop {answers} answers from stepper.data, by reference
 * @prop {Steps} steps steps to use in stepper
 * @prop {Question} current last step accessed, for easier chaining
 * @type {ChainedMap}
 */
class Core extends ChainedMap {

  /**
   * @see Core.program
   * @return {Core}
   */
  static program(...args) {
    return Core.init().program(...args)
  }

  /**
   * @param {Core | StepChild | any} [parent]
   * @return {Core}
   */
  static init(parent) {
    return new Core(parent)
  }

  /**
   * @param {Core | StepChild | any} [parent]
   */
  constructor(parent) {
    super(parent).handleParent(parent)

    this.answerCallbacks = new ChainedSet(this)
    this.stepper = new Stepper(this)
    this.answers = this.stepper.data
    this.steps = new Steps(this)
  }

  /**
   * @protected
   * @desc binds parent methods to child for easy chaining back up
   * @param {any} [parent]
   */
  handleParent(parent) {
    if (!this.parent || !this.parent.delimiter) return
    this.delimiter = this.parent.delimiter.bind(this.parent)
    this.parse = this.parent.parse.bind(this.parent)
    this.show = this.parent.show.bind(this.parent)
    this.command = this.parent.command.bind(this.parent)
    this.alias = this.parent.alias.bind(this.parent)
    this.action = this.parent.action.bind(this.parent)
  }

  /**
   * @protected
   * @desc decorates the latest step for easy chaining
   * @return {Core} @chainable
   */
  decorateCurrent() {
    this.current.step = this.step.bind(this)

    // this.current.confirm = this.confirm.bind(this)
    // this.current.input = this.input.bind(this)
    // this.current.list = this.list.bind(this)
    // this.current.stepChild = this.stepChild.bind(this)

    this.current.stepChild = this.stepChild.bind(this.current)
    this.current.child = this.child.bind(this)
    this.current.then = this.then.bind(this)

    if (this.parent && this.parent.delimiter) {
      this.current.delimiter = this.parent.delimiter.bind(this.parent)
      this.current.parse = this.parent.parse.bind(this.parent)
      this.current.show = this.parent.show.bind(this.parent)
      this.current.command = this.parent.command.bind(this.parent)
    }

    return this
  }

  // --- program ---

  /**
   * @param  {VorpalArgs} args args to pass to Vorpal
   * @return {Program}
   */
  program(...args) {
    return new Program(this).program(...args)
  }

  /**
   * @desc   function to call each time a user inputs an answer
   * @param  {Function} [cb=Function.prototype]
   * @return {Core} @chainable
   */
  onAnswers(cb = Function.prototype) {
    this.answerCallbacks.add(cb)
    return this
  }

  /**
   * @desc after all answers are done,
   *       since we chain the promises
   *       it is a delayed promise resolve
   *
   * @param  {Function} cb
   * @return {Core} @chainable
   */
  then(cb) {
    return this.set('then', cb)
  }

  /**
   * @desc calls toConfig,
   *       passes in .then to stepper when there is one,
   *       starts the stepper
   *
   * @return {Promise}
   */
  run() {
    const steps = this.toConfig().steps
    this.thenner = this.stepper.start(steps)

    if (this.has('then') === true) {
      this.thenner.then(this.get('then'))
    }

    return this.thenner
  }

  /**
   * @alias prompt
   * @alias choice
   *
   * @desc   add a step, which is a new Question
   * @param  {string} name key for the step, ends up on answers
   * @param  {string} [type='checkbox']
   * @param  {string} [msg=null] defaults to `name`, text that is shown
   * @return {StepChild} @chainable
   */
  step(name, type = 'checkbox', msg = null) {
    if (msg === null) msg = name
    this.current = new Question(this).name(name).type(type).message(msg)
    this.decorateCurrent()
    this.steps.add(this.current)
    return this.current
  }

  /**
   * @TODO: abstract this and stepChild
   * @TODO: pass in condition (when) here optionally
   * @desc similar to stepChild, but adds to THIS.steps, not PARENT.steps
   * @see    this.stepChild, StepChild
   * @param  {string} name key for the step, ends up on answers
   * @param  {string} type any valid vorpal `type`
   * @param  {string} [msg=null] defaults to `name`, text that is shown
   * @return {StepChild} @chainable
   */
  child(name, type, msg = null) {
    // eslint-disable-next-line
    const current = new StepChild(this)

    // improve... maybe need to loop... only 2 levels
    // store ref
    // .data.values().pop()
    const parent = this.current.get('name')
    let currentChoice = this.current

    if (currentChoice.current) currentChoice = currentChoice.current
    currentChoice = currentChoice.get('name')

    const step = current.step(name, type, msg)
    step.when(answers => {
      // parent.childName
      let key = parent + '.' + currentChoice
      // get answer
      let parentAnswer = this.answers[parent]

      let result

      // checkboxes
      if (Array.isArray(parentAnswer)) {
        result = parentAnswer.includes(key)
      }
      else {
        // input
        result = !!parentAnswer[key]
      }

      // fallback
      if (!result) {
        key = parent
        parentAnswer = this.answers[parent]

        // if it was a confirm y/n
        if (parentAnswer === true) {
          result = parentAnswer
        }
        else if (Array.isArray(parentAnswer)) {
          // checkboxes
          result = parentAnswer.includes(key)
        }
        else {
          // input?
          result = parentAnswer[key]
        }
      }

      return result
    })

    this.steps.add(current)

    return step
  }

  /**
   * @desc   add a child step that has an auto-setup .when condition to be used
   * @param  {string} name key for the step, ends up on answers
   * @param  {string} [type='list'] any valid vorpal `type`
   * @param  {string} [msg=null] defaults to `name`, text that is shown
   * @return {StepChild} @chainable
   */
  stepChild(name, type = 'list', msg = null) {
    // eslint-disable-next-line
    const current = new StepChild(this)
    const parent = this.current.get('name')

    let currentChoice = this.current
    if (currentChoice.current) currentChoice = currentChoice.current

    currentChoice = currentChoice.get('name')

    const step = current.step(name, type, msg)

    step.when(answers => {
      // parent.childName
      let key = parent + '.' + currentChoice
      // get answer
      let parentAnswer = this.answers[parent]

      let result

      // checkboxes
      if (Array.isArray(parentAnswer)) {
        result = parentAnswer.includes(key)
      }
      else {
        // input
        result = !!parentAnswer[key]
      }

      // fallback
      if (!result) {
        key = parent
        parentAnswer = this.answers[parent]

        // if it was a confirm y/n
        if (parentAnswer === true) {
          result = parentAnswer
        }
        else if (Array.isArray(parentAnswer)) {
          // checkboxes
          result = parentAnswer.includes(key)
        }
        else {
          // input?
          result = parentAnswer[key]
        }
      }
      return result
    })

    this.parent.steps.add(current)

    return step
  }

  toConfig() {
    return this.steps.toConfig()
  }

  // --- todo ---
  // story() {}

  // but it is optional :s
  // group is section / QYUESTIONS...
  // group() {}

  // goToStep
  // getStep

  // steps() {}

  // checkbox(name, msg) { return this.step(name, msg, 'checkbox') }
  // confirm(name, msg) { return this.step(name, msg, 'confirm') }
  // input(name, msg) { return this.step(name, msg, 'input') }
  // list(name, msg) { return this.step(name, msg, 'list') }
}

class StepChild extends Core {
  // step(name, type = 'checkbox', msg = null) {
  //   return this.end().step(name, type, msg)
  // }

  /**
   * @desc runs toConfig, then returns only the first step
   * @return {Step}
   */
  toConfig() {
    const steps = this.steps.toConfig().steps
    const first = steps.shift()
    return first
  }
}

Core.StepChild = StepChild

module.exports = Core
