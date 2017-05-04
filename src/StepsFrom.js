const toarr = require('to-arr')
const {ChainedMap, ChainedSet, log} = require('./deps')
const CLI = require('./Core')

/**
 * @NOTE WIP
 * @TODO: make this all work
 * @desc interactive hydratable persistable config presets for existing clis
 */
module.exports = class StepsFrom extends ChainedMap {

  /**
   * @return {StepsFrom} @chainable
   */
  static init() {
    return new StepsFrom()
  }

  // @NOTE: unused
  // toProgram() {
  //   // .program()
  //   // .command('flip-presets')
  //   // .actionPrompt('flip-presets')
  // }

  /**
   * @tutorial https://github.com/SBoudrias/Inquirer.js#reactive-interface
   * @param  {Program} program
   * @return {StepsFrom} @chainable
   */
  handle(program) {
    // const program = this.parent.program
    const cli = new CLI()
    let steps = cli

    this.uniqued = new ChainedSet(this)

    this.onAnswers = cb => {
      cli.onAnswers(cb)
      return this
    }

    // filter the built-in fns
    const cmds = program.commands.filter((cmd, i) => {
      if (['help', 'exit'].includes(cmd._name)) return false
      return cmd
    })

    // @TODO: only list if more than 1, and probably checkbox...
    if (cmds.length > 1) {
      // steps = steps.step('cmdname', 'list')
      steps = steps.step('cmdname')
      cmds.map(cmd => (steps = steps.choice(cmd._name, cmd._description)))
    }

    // go through each command, remap to steps
    cmds.forEach((CMD, i) => {
      let cmd = {
        cmdname: CMD._name,
        msg: CMD._description,
        args: CMD._args || [],
        options: CMD.options || [],
        checkboxs: CMD.options.filter(opt => opt.bool === true),
        inputs: CMD.options.filter(opt => opt.bool !== true),
      }

      const {cmdname, msg} = cmd

      // steps = steps.separator('=== args ===')

      log.data(steps).bold(i + ' ' + cmdname + ' ' + msg).echo(false)

      // @example: [packages]
      cmd.args.forEach(arg => {
        const {variadic, name, required} = arg
        let input = steps.step(name, 'input')
        // if (required) steps.validate((inputs, two) => )
        steps = input.toSteps()
      })

      // go through the checkboxes, add as `-args`
      // log.quick(steps)
      if (cmd.checkboxs.length) {
        steps = steps.step(cmdname + '-args', 'checkbox')
        cmd.checkboxs.forEach(cbx => {
          const {
            required,
            optional,
            bool,
            autocomplete,
            description,
            long,
            short,
          } = cbx

          // remove the double dash, add as checkbox
          const chkbx = cbx.long.replace('--', '')
          steps = steps.checkbox(chkbx).default(false).message(cbx.description)
          // .message('(flag) ' + cbx.description)
          // .message('--' + cbx.description)
          if (required && !optional) steps.disabled(true).default(true)

          // scopes it to just this command
          // but then presets are useless to just do 1 command...
          // steps.when(answers => answers.cmdname === `cmdname.${cmdname}`)
        })

        // steps = steps.end()
      }
    })

    // log.quick(steps.toSteps().toConfig())
    this.cli = steps.toSteps()

    return this
  }

  /**
   * @desc unique the names
   * @param  {string | Array<string>} names names of steps to unique
   * @return {StepsFrom} @chainable
   */
  uniq(names) {
    this.onAnswers(args => {
      const {stepper, answers} = args

      // unique the commands
      if (answers.cmdname !== undefined) {
        const cmds = answers.cmdname
        const cmdns = cmds.map(c => c.replace('cmdname.', '') + '-args')
        stepper.steps = stepper.steps.filter(step => {
          // log.data({cmdns, name: step.name}).echo()
          // only filter ones for the cmd-name args
          if (!step.name.includes('-args')) return true
          return cmdns.includes(step.name)
        })
      }

      // unique each
      toarr(names).forEach(name => {
        // ignore if we've uniqued
        if (this.uniqued.has(name) === true) return
        if (answers.packages === undefined) return

        // save that we uniqued it
        this.uniqued.add(name)

        // remap the steps,
        // filter out duplicates with the name
        stepper.steps = stepper.steps.filter(step => step.name !== name)

        // @TODO: needs more thought
        // update the index
        stepper.indx = stepper.steps.length - 2

        // log.quick(stepper.steps)
        console.log('onAnswers', answers)
      })
    })

    return this
  }

  /**
   * @see Core.run
   * @param {Function} cb
   * @return {StepsFrom} @chainable
   */
  then(cb) {
    this.cli.then(cb)
    return this
  }

  /**
   * @see Core.run
   * @return {StepsFrom} @chainable
   */
  run() {
    this.cli.run()
    return this
  }
}
