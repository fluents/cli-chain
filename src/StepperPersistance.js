/**
 * @file a Stepper persisting chain
 * @exports StepperPersistance
 * @requires configstore
 * @requires fliplog
 * @requires inquirer
 * @requires prettydate
 * @requires flipchain/ChainedMap
 */

const ChainedMap = require('flipchain/ChainedMap')
const ConfigStore = require('configstore')
const BottomBar = require('inquirer/lib/ui/bottom-bar')
const {inquirer, log, prettydate} = require('./deps')
const Core = require('./Core')

const keys = {
  up: '\u001b[A',
  right: '\u001b[C',
  down: '\u001b[B',
  delete: '',
}

let debug = false

/**
 * @description
 *  check if there are any saved states
 *  prompt with a list of saved states
 *  allow deleting of those saved states
 *
 * @prop {boolean} showing showing the list
 * @prop {boolean} deleting prompting deleting of an item
 * @prop {boolean} hydrated already rehydrated, when prompting to rehydrate
 * @prop {boolean} confirming asking to resume, don't listen to keypresses
 * @prop {number} indx current _session_ index, varies from Stepper.indx
 * @prop {string} hash key to match sessions that are able to be used for a hash
 * @prop {Object} stdin for subscribing to stdin events (for going back)
 * @prop {Function} onStdIn subscriber for stdin
 * @prop {Object} sessions configstore sessions...
 * @prop {ConfigStore} store configstore for persisting
 * @prop {Object} prompter inquirer instance
 * @prop {Object} ui inquirer.ui
 * @type {ChainedMap}
 */
class StepperPersistance extends ChainedMap {

  /**
   * @param {Stepper} parent parent chain
   */
  // constructor(parent) {
  //   super(parent)
  // }

  // --- ops ---

  /**
   * @since 0.0.11
   * @desc setup and reset
   * @param {Array<Step>} [steps = null] steps to use as key
   * @return {StepperPersistance} @chainable
   */
  reset(steps = null) {
    let hash = steps
    if (hash === null && this.hash) hash = this.hash
    else hash = JSON.stringify(hash)

    this.key = hash + '.sessions'
    this.store = new ConfigStore('cli-chain')
    this.indx = 0
    this.showing = false
    this.deleting = false

    if (!this.store.has(this.key)) this.store.set(this.key, [])
    this.sessions = this.store.get(this.key)

    return this
  }

  /**
   * @since 0.0.11
   * @see configstore, Stepper, StepperPersistance.reset
   * @desc checks if there are existing stored sessions
   * @param {Object} steps stringified steps to serve as a hash
   * @return {boolean} hydratable or not
   */
  isHydratable(steps) {
    if (this.hydrated === true) return false

    this.reset(steps)

    const hasSessions = this.sessions.length !== 0

    // log.quick({sessions: this.sessions, hasSessions, hydrated: this.hydrated})

    return hasSessions
  }

  /**
   * @since 0.0.11
   * @see configstore
   * @desc save the current index and state
   * @return {StepperPersistance} @chainable
   */
  persist() {
    const {store, parent} = this

    const data = {
      indx: parent.indx,
      steps: parent.steps,
      data: parent.data,
      now: Date.now(),
    }

    this.sessions.push(data)

    store.set(this.key, this.sessions)

    log
      .blue('\n👋 saved session: \n')
      .json({
        data: data.data,
        file: log.colored(store.path, 'underline'),
      })
      .echo()

    return this
  }

  // --- setup / helpers ---

  /**
   * @protected
   * @since 0.0.11
   * @desc unsubscribes
   * @return {StepperPersistance} @chainable
   */
  removeStdIn() {
    log.red('removing stdin').echo(debug)
    this.stdin.removeListener('data', this.onStdIn)

    try {
      this.ui.close()
    }
    catch (e) {
      // ignore
    }

    return this
  }

  /**
   * @since 0.0.11
   * @desc subscribes to std in, sets .stdin and .onStdIn
   * @event data process.stdin.data
   * @return {StepperPersistance} @chainable
   */
  setupStdIn() {
    if (this.stdin) this.removeStdIn()

    const bb = new BottomBar({bottomBar: ''})

    this.stdin = process.stdin

    /**
     * @param {Buffer} buffer stdin buffer
     * @return {Buffer} stdin buffer
     */
    this.onStdIn = buffer => {
      const key = buffer.toString()

      // safety
      if (this.deleting) {
        return buffer
      }
      if (this.showing === true) {
        this.showing = false
        log.clear()
      }
      if (this.confirming === true) {
        return buffer
      }
      if (!this.sessions[this.indx]) {
        log.red('no sessions at current').echo(debug)
        return buffer
      }

      switch (key) {
        case keys.delete: {
          log.bold('pressed [backspace]').echo(debug)
          this.deleting = true
          this.handleDelete()
          break
        }
        case keys.up: {
          log.bold('pressed [up]').echo(debug)
          this.indx--
          break
        }
        case keys.down: {
          log.bold('pressed [down]').echo(debug)

          this.indx++
          break
        }
        case keys.right: {
          log.bold('pressed [right]').echo(debug)

          this.showing = true
          this.echoCurrent()
          break
        }
        default: {
          log.bold('pressed [other?]').echo(debug)

          const bbm = '[right arrow] to show data, [backspace] to delete'
          bb.updateBottomBar(bbm)
          console.log('\n')
        }
      }

      // went back to top
      if (!this.sessions[this.indx]) this.indx = 0

      return buffer
    }

    this.stdin.on('data', this.onStdIn)

    return this
  }

  /**
   * @protected
   * @since 0.0.11
   * @desc echos current session when using [->] or deleting
   * @see this.promptDelete
   * @return {StepperPersistance} @chainable
   */
  echoCurrent() {
    const session = this.sessions[this.indx]

    log
      .text('\n\n')
      .json({
        answers: session.data,
        index: session.indx,
        indx: this.indx,
      })
      .echo()

    return this
  }

  /**
   * @since 0.0.11
   * @desc transforms data with prettydate,
   *       colors a message,
   *       maps sessions to prompts
   * @return {Object} latest session, message
   */
  getData() {
    let sessions = this.store.get(this.key)
    const last = sessions[sessions.length - 1]
    const when = prettydate(last.now)
    const {indx, data} = last
    let message = 'resume a session? '
    message += log.colored('last one was ' + when, 'dim')

    const choices = sessions.reverse().map((session, i) => {
      return {
        message: when,
        name: when,
      }
    })

    return {message, sessions, last, when, indx, data, choices}
  }

  // --- delete ---

  /**
   * @protected
   * @since 0.0.11
   * @see this.promptDelete, this.handleCancelDelete
   * @desc deletes current index, updates configstore
   * @return {StepperPersistance} @chainable
   */
  handleDelete() {
    delete this.sessions[this.indx]
    this.sessions = this.sessions.filter(session => session)
    this.store.set(this.key, this.sessions)
    log.cyan('deleted :-)').echo()
    return this
  }

  /**
   * @since 0.0.11
   * @see this.rehydrate
   * @desc removes listener / resets, starts again
   * @return {StepperPersistance} @chainable
   */
  handleCancelDelete() {
    log.blue('NOT deleted :-)').echo()
    this.deleting = false
    this.removeStdIn()
    return this.reset()
  }

  /**
   * @TODO: use Core here
   * @since 0.0.11
   * @see this.echoCurrent, this.handleDelete, this.handleCancelDelete
   * @desc closes ui, prompts to delete
   * @return {StepperPersistance} @chainable
   */
  promptDelete() {
    this.ui.close()

    this.echoCurrent()

    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'delete',
          message: 'delete?',
        },
      ])
      .then(answers => {
        if (answers.delete) this.handleDelete()
        else this.handleCancelDelete()
      })

    return this
  }

  // --- rehydrate ---

  /**
   * @TODO use a .toConfig of steps
   * @protected
   * @since 0.0.11
   * @see this.thenner, Stepper._start
   * @desc rehydrate from a saved state
   * @param {number} indx
   * @param {Array<*>} data
   * @return {StepperPersistance} @chainable
   */
  rehydrate(indx, data) {
    this.parent.indx = indx
    this.parent.data = data
    this.hydrated = true
    this.parent._start()
    return this
  }

  /**
   * @since 0.0.11
   * @see this.getData
   * @desc prompts to rehydrate
   * @return {Class} @chainable
   */
  thenner() {
    this.setupStdIn()

    let {message, sessions, last, when, indx, data, choices} = this.getData()

    this.confirming = true
    this.prompter = inquirer.prompt([
      {
        type: 'confirm',
        name: 'resume',
        message,
      },
      {
        type: 'list',
        message: 'sessions:',
        name: 'sessions',
        choices,
        when: answers => {
          this.confirming = false
          return answers.resume
        },
      },
    ])

    this.ui = this.prompter.ui

    /* prettier-ignore */
    this.prompter
      .then(answers => {
        if (answers.resume === false) {
          this.removeStdIn()
          this.parent._start()
          return
        }
          // log.quick(answers, this.sessions[this.indx])
        log
            .green('\nresuming session\n')
            .json({
              when,
              data,
              indx,
            })
            .echo()

        this.removeStdIn()
        this.rehydrate(indx, data)
      },
        {input: this.stdin})
      .catch(log.catch)

    return this
  }
}

module.exports = StepperPersistance
