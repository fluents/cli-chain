const log = require('fliplog')
const {orderByKeys, Script, toarr} = require('./deps')

const scripts = Script
// const presetCache = flipcache.from('./cli-presets').json().load()

/**
 * @TODO:
 * - [ ] should be configurable
 *       if they want presets to be saved to pkgjson
 *       or to a file that is not gitignored
 *
 * add
 *   makes a config file for presets
 * load
 *   loads an existing presets from the config file
 *   executes it in a subprocess
 *   it should (be able to) reset argv, then re-run program
 *
 * @NOTE WIP
 * @type {ChainedMap}
 */
class Presets {
  use(name) {
    return

    const preset = presetCache.get(name)

    const presets = preset.presets
    const scopes = preset.packages

    // would take env out of the args of each...?
    const multipliers = ''

    // @TODO:
    // should be able to use merge with chain
    //
    // should be able to run programs without a double subprogram
    // just edit flags, require program without cache
    //
    Object.keys(presets).forEach(cmd =>
      multipliers.forEach(env => {
        const script = scripts.add().node().raw('flip.js').raw(cmd).raw(scopes)
        // .env(env)

        presets[cmd].map.forEach(flag => script.flag(flag))
      })
    )

    log.quick(presets)
  }

  /**
   * @param  {string | Array<string>} val
   * @param  {string} prop
   * @return {Object}
   */
  getKeyFlag(val, prop) {
    // if (typeof val === 'string') return {key: prop, flag: val}
    const split = val.split('.')
    const key = prop || split.shift()
    const flag = split.pop() || val
    return {split, key, flag}
  }

  /**
   * @TODO:
   * - [ ] need to add some decorator/transformer that changes it when saving...
   *
   * @param {Object} preset
   * @param {Array<string>} [order=[]]
   */
  add(preset, order = []) {
    return

    let presets = {}

    // extract packages
    // const packages = arrToObj(toarr(preset.packages))

    Object.keys(preset).forEach(prop => {
      toarr(preset[prop]).forEach(val => {
        const {key, flag} = this.getKeyFlag(val, prop)
        if (!presets[key]) presets[key] = []
        presets[key].push(flag)
        log.data({flag, key, val, prop}).bold('pre').echo()
      })
    })

    // log.quick(presets)
    presets = orderByKeys(presets, order)
    const key = 'presets.' + presets.name
    // delete presets.name

    presetCache.set(key, presets)
    this.presets = presets
  }

  persist() {
    // save to disk
    // flipcache()
  }
}

module.exports = Presets
