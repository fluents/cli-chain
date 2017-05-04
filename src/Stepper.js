/**
 * @file a Stepper chain
 * @exports Stepper
 * @requires inquirer
 * @requires fliplog
 * @requires ./StepperPersistance
 */

const {inquirer, log} = require('./deps')
const StepperPersistance = require('./StepperPersistance')

/**
 * @prop {*} parent
 * @prop {Object} data answers from prompting
 * @prop {* | Function} answerCallbacks
 * @prop {boolean} goingBack for stepping back in interactive
 * @prop {number} indx current step index
 * @prop {Object} prompter inquirer instance
 * @prop {Object} ui inquirer.ui
 * @prop {Array<Step>} steps in Stepper.start
 * @prop {Function} resolve in Stepper.start, for using .then
 * @prop {Object} stdin for subscribing to stdin events (for going back)
 * @prop {StepperPersistance} persistance persisting & hydrating
 * @type {ChainedMap}
 */
class Stepper {

  /**
   * @since 0.0.1
   * @param  {Chainable | any} parent
   */
  constructor(parent) {
    this.data = {}
    this.parent = parent
    this.answerCallbacks = parent.answerCallbacks
    this.goingBack = false
    this.persistance = new StepperPersistance(this)
  }

  /**
   * @description
   *  sets this.resolve in a returned promise
   *  which can be used by Stepper.then
   *  when iterating through steps in Stepper.thenner
   *
   * @since 0.0.8
   * @param  {Array<Step>} steps
   * @return {Promise}
   */
  start(steps) {
    // this.data = {}
    this.steps = steps
    this.indx = 0

    if (this.persistance.isHydratable(this.steps)) {
      this.persistance.thenner(this.steps)
    }
    else {
      this._start()
    }

    return new Promise(resolve => {
      this.resolve = resolve
    })
  }

  /**
   * @protected
   * @since 0.0.11
   * @see this.start, persistance.hydrate
   * @desc does actual setup
   * @return {Stepper} @chainable
   */
  _start() {
    this.setupStdIn()
    this.thenner()
    return this
  }

  /**
   * @TODO going back 2 doubles things, need to clear and fix?
   *
   * @tutorial https://github.com/SBoudrias/Inquirer.js/issues/405
   * @since 0.0.9
   * @desc sets up process.stdin observer that will step back if needed
   * @see Stepper.index, Stepper.thenner, Stepper.start
   * @return {Stepper} @chainable
   */
  setupStdIn() {
    // https://github.com/SBoudrias/Inquirer.js/issues/405
    const stdin = process.stdin
    const onStdIn = buffer => {
      const key = buffer.toString()

      // control + b
      if (key === '\u0002') {
        if (this.goingBack !== false) {
          // console.log('\n goingBack was not false', this.goingBack)
          return buffer
        }

        // ignore because we cannot go back
        if (this.indx === 0) {
          return buffer
        }
        // console.log('\ncatching ctrl+b, going back 1 step', this.goingBack)
        this.indx = this.indx - 1
        this.goingBack = true

        // remove listener, will continue afterwards
        // otherwise it listens twice
        this.ui.close()
        setTimeout(() => {
          this.goingBack = false
        }, 500)

        // thenFn(this.data)
        this.thenner()
      }
      else if (key === '\u0003') {
        // control + c
        this.persistance.persist()
      }

      return buffer
    }

    stdin.on('data', onStdIn)
    this.stdin = stdin

    return this
  }

  /**
   * @see Stepper.steps
   * @since 0.0.6
   * @return {Promise | null}
   */
  thenner() {
    const steps = this.steps[this.indx]

    // done steps, save and resolve promise
    if (!steps) {
      // this.indx = 0
      this.persistance.persist()
      this.resolve(this.data)
      return null
    }

    // scoped
    const thenFn = answers => {
      if (this.goingBack === true) {
        console.log('thenned when going back...')
      }

      // log.quick(this.answerCallbacks.values(), this.parent)
      // HERE, COULD KEEP A COPY OF THE STEPS BEFORE .TOSTEPS
      // THEN ADD A METHOD LIKE `FROM-STEP`
      // AND DEFAULT-FOR
      // console.log({answers}, this.steps)
      this.answerCallbacks.values().forEach(cb => {
        const args = {
          answers,
          steps,
          stepper: this,
        }

        cb(args)
      })

      Object.assign(this.data, answers)
      this.indx++
      setTimeout(() => this.thenner(), 1)
    }

    if (this.indx === 0) {
      steps.message += log.colored(' (use [cmd + b] to go back)', 'dim')
    }

    this.prompter = inquirer.prompt(steps, {input: this.stdin})
    this.ui = this.prompter.ui

    // if (steps.type === 'checkbox') steps.message += ' (use [spacebar])'
    this.prompter.then(thenFn).catch(log.catch)

    return this.prompter
  }
}

module.exports = Stepper
