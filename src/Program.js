/**
 * @file a wrapper for Vorpal
 * @exports Program
 * @requires funwithflags
 * @requires vorpal
 * @requires inspector-gadget
 * @requires flipchain/ChainedSet
 * @requires flipchain/ChainedMap
 * @requires ./Script
 */

const fwf = require('funwithflags')
const {
  ChainedMap,
  ChainedSet,
  vorpal,
  Script,
  inspectorGadget,
} = require('./deps')

const ignore = [
  'parent',
  'workflow',
  'currentVorpal',
  '_parent',
  'util',
  'lodash',
]

/**
 * @desc wrapper around vorpal
 * @prop {Function} inspect inspector-gadget .inspect helper
 * @prop {ChainedSet} actions
 * @prop {Object} middleware
 * @type {ChainedMap}
 */
class Program extends ChainedMap {

  /**
   * @param {Program | any} parent
   */
  constructor(parent) {
    super(parent)
    this.inspect = inspectorGadget(this)
    this.actions = new ChainedSet(this, ignore)
    this.middleware = {}

    // if (parent !== null && parent !== undefined && parent.has('onAnswers')) {
    //   this.set('onAnswers', parent.get('onAnswers'))
    // }
  }

  /**
   * @TODO: get the pkg json version
   * @param {string} [version]
   * @return {Vorpal} new
   */
  program(version = null) {
    this.vorpal = vorpal
    this.vorpal.version(version || '1.0.0')
    // this.onAnswers = (cb) => this.answerCallbacks.add(cb)
    // this.vorpal.actionPrompt = this.actionPrompt.bind(this)

    // --- vorpal instance

    this.delimiter = (delimiter = '🏗  fliphub ➜') => {
      this.vorpal.delimiter(delimiter)
      return this
    }
    this.show = show => {
      this.vorpal.show(show)
      return this
    }
    this.hide = () => {
      this.vorpal.hide()
      return this
    }
    this.history = id => {
      this.vorpal.history(id)
      return this
    }
    this.parse = (argv = process.argv) => {
      this.vorpal.parse(argv)
      return this
    }
    this.onCommand = cb => this.set('onCommand', cb)

    this.localStorage = this.vorpal.localStorage
    this.commands = this.vorpal.commands
    this.util = this.vorpal.util
    this.vorpal.inspect = inspectorGadget(this, ignore.concat(['vorpal']))

    // as a preset?
    // @TODO: just allow unknown options
    this.parseEnv = (argv = process.argv) => {
      if (this.middleware.script) {
        const {production, development} = fwf(argv.slice(2), {
          boolean: ['development', 'production'],
          alias: {
            d: 'development',
            p: 'production',
          },
          default: {
            production: true,
          },
        })

        if (production) {
          this.middleware.script.env('NODE_ENV', 'production')
        }
        else if (development) {
          this.middleware.script.env('NODE_ENV', 'development')
        }
        else {
          this.middleware.script.env('NODE_ENV', process.env.NODE_ENV)
        }
      }

      return this.parse(argv)
    }

    this.allowAllUnknownOptions = () => {
      this.onCommand(currentVorpal => {
        currentVorpal.allowUnknownOptions()
      })
    }

    // --- vorpal current ---
    // https://github.com/dthree/vorpal/wiki/Docs-%7C-Using-Arrow-Functions
    this.types = id => {
      this.currentVorpal.types(id)
      return this
    }

    this.alias = alias => {
      this.currentVorpal.alias(alias)
      return this
    }
    this.command = (...args) => {
      // console.log('adding command...', args)
      this.currentVorpal = this.vorpal.command(...args)
      if (this.has('onCommand') === true) {
        this.get('onCommand')(this.currentVorpal, this)
      }
      return this
    }

    this.allowUnknownOptions = (...args) => {
      this.currentVorpal = this.vorpal.autocomplete(...args)
      return this
    }
    this.autocomplete = (...args) => {
      this.currentVorpal = this.vorpal.description(...args)
      return this
    }

    // autocomplete, allowUnknownOptions
    this.description = (...args) => {
      this.currentVorpal = this.currentVorpal.description(...args)
      return this
    }
    this.action = (...args) => {
      this.currentVorpal.action(...args)
      return this
    }
    this.option = (...args) => {
      this.currentVorpal.option(...args)
      return this
    }
    this.cancel = (...args) => {
      this.currentVorpal.cancel(...args)
      return this
    }
    this.help = (...args) => {
      this.currentVorpal.help(...args)
      return this
    }
    this.remove = (...args) => {
      this.currentVorpal.remove(...args)
      return this
    }

    this.delimiter()
    return this
  }

  /**
   * @desc use a middleware
   * @param  {Object} middleware
   * @return {Program} @chainable
   */
  use(middleware) {
    if (!middleware) {
      return this
    }
    if (middleware instanceof Script) {
      this.middleware.script = middleware
    }
    else {
      const key =
        middleware.name || middleware.className || middleware.constructor.name
      this.middleware[key] = middleware
    }
    return this
  }

  /**
   * @param {string} name
   * @param {string} [type='checkbox']
   * @param {string} [msg=null]
   * @param {Function} [cb=null]
   * @return {Vorpal}
   */
  actionPrompt(name, type = 'checkbox', msg = null, cb = null) {
    const Core = require('./Core')
    const cli = new Core(this)
    const step = cli.step(name, type, msg, cb)

    this.current = cli
    this.actions.add(cli)

    if (cb === null) cb = data => Promise.resolve(data)

    this.action(args => {
      console.log(args)
      cli.run().then(cb)
    })

    return step
  }
}

module.exports = Program
