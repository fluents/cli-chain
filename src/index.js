/**
 * @file entry point
 * @module cli-chain
 * @requires likeaboss
 * @requires vorpal
 * @requires lodash.sortBy
 * @requires inspector-gadget
 * @requires to-arr
 * @requires inquirer
 * @requires ./Core
 */

const Boss = require('likeaboss')
const {
  log,
  vorpal,
  inquirer,
  orderByKeys,
  toarr,
  inspectorGadget,
} = require('./deps')
const Core = require('./Core')

exports = module.exports = Boss.module(module)
  .main(Core)
  .dir(__dirname)
  .props({
    orderByKeys,
    toarr,
    vorpal,
    inquirer,
    log,
    CLI: Core,
    inspectorGadget,
  })
  .dynamics([
    {name: 'Presets', path: './Presets'},
    {name: 'Choice', path: './Choice'},
    {name: 'Script', path: './Script'},
    {name: 'Steps', path: './Steps'},
    {name: 'StepsFrom', path: './StepsFrom'},
    {name: 'Program', path: './Program'},
    {name: 'Question', path: './Question'},
    {name: 'Stepper', path: './Stepper'},
  ])
  .end()
