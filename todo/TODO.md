also need to have
- flipflags able to edit flags as an easy cmd (to run cmds again)
- vorpal

https://www.npmjs.com/package/prompt
https://github.com/enquirer/enquirer
https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command

add as step
  select,
    substep
      input, if not bool
      checkbox if bool

finish presets

- [ ] toStep(number/name)


// --- in steps from

// https://github.com/Reactive-Extensions/RxJS
// observe() {
//   var prompts = new Rx.Subject()
//   inquirer.prompt(prompts)
//
//   // At some point in the future, push new questions
//   prompts.onNext({ /* question... */ })
//   prompts.onNext({ /* question... */ })
//
//   // When you're done
//   prompts.onCompleted()
// }
