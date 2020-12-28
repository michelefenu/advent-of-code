const cupStack = require('../../modules/cup-stack.js')

function solve(input) {
  const cups = input[0].split('').map(x => parseInt(x))

  return cupStack.runExtremeSimulation(cups, 10000000)
}

module.exports = { solve }
