const toarr = require('to-arr')
const log = require('fliplog')
const inquirer = require('inquirer')
const Vorpal = require('vorpal')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const ChainedSets = require('flipchain/ChainedSet')
const _sortBy = require('lodash.sortby')
const Script = require('script-chain')
const doesInclude = require('does-include')

const vorpal = new Vorpal()

function orderByKeys(obj, orderFirst) {
  const orderedObj = {}
  orderFirst = orderFirst.reverse()
  const keys = Object.keys(obj)
  _sortBy(keys, key => orderFirst.indexOf(key)).reverse().forEach(key => {
    orderedObj[key] = obj[key]
  })
  return orderedObj
}

// @NOTE: would be good as a decorator
// @NOTE: would be good as a decorator
class ChainedMap extends ChainedMapExtendable {
  toSteps() {
    let parent = this
    while (parent.parent) {
      parent = parent.parent
    }
    return parent
  }
}
class ChainedSet extends ChainedSets {
  toSteps() {
    let parent = this
    while (parent.parent) {
      parent = parent.parent
    }
    return parent
  }
}

// https://github.com/netcode/node-prettydate/blob/master/index.js
function createHandler(divisor, noun, restOfString) {
  return function(diff) {
    var n = Math.floor(diff / divisor)
    var pluralizedNoun = noun + (n > 1 ? 's' : '')
    return '' + n + ' ' + pluralizedNoun + ' ' + restOfString
  }
}
var formatters = [
  {threshold: -31535999, handler: createHandler(-31536000, 'year', 'from now')},
  {threshold: -2591999, handler: createHandler(-2592000, 'month', 'from now')},
  {threshold: -604799, handler: createHandler(-604800, 'week', 'from now')},
  {threshold: -172799, handler: createHandler(-86400, 'day', 'from now')},
  {
    threshold: -86399,
    handler() {
      return 'tomorrow'
    },
  },
  {threshold: -3599, handler: createHandler(-3600, 'hour', 'from now')},
  {threshold: -59, handler: createHandler(-60, 'minute', 'from now')},
  {threshold: -0.9999, handler: createHandler(-1, 'second', 'from now')},
  {
    threshold: 1,
    handler() {
      return 'just now'
    },
  },
  {threshold: 60, handler: createHandler(1, 'second', 'ago')},
  {threshold: 3600, handler: createHandler(60, 'minute', 'ago')},
  {threshold: 86400, handler: createHandler(3600, 'hour', 'ago')},
  {
    threshold: 172800,
    handler() {
      return 'yesterday'
    },
  },
  {threshold: 604800, handler: createHandler(86400, 'day', 'ago')},
  {threshold: 2592000, handler: createHandler(604800, 'week', 'ago')},
  {threshold: 31536000, handler: createHandler(2592000, 'month', 'ago')},
  {threshold: Infinity, handler: createHandler(31536000, 'year', 'ago')},
]
function prettydate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  var diff = (new Date().getTime() - date.getTime()) / 1000
  for (var i = 0; i < formatters.length; i++) {
    if (diff < formatters[i].threshold) {
      return formatters[i].handler(diff)
    }
  }
  throw new Error('exhausted all formatter options, none found') // should never be reached
}

module.exports = {
  doesInclude,
  // flipcache,
  Script,
  orderByKeys,
  ChainedMap,
  ChainedSet,
  toarr,
  log,
  inquirer,
  vorpal,
  prettydate,
}
