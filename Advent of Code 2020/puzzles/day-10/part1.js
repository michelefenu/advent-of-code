const { getAdaptersChain } = require('../../modules/joltage-utils')
const joltageUtils = require('../../modules/joltage-utils')

function solve(input) {
  input = input.map(x => parseInt(x))

  const adaptersChain = joltageUtils.getAdaptersChain(input)

  let numberOfJump1 = 0;
  let numberOfJump3 = 1;

  for (let i = 0; i < adaptersChain.length; i++) {
    if(adaptersChain[i] - (adaptersChain[i-1] || 0) === 1) {
      numberOfJump1++
    } else if(adaptersChain[i] - (adaptersChain[i-1] || 0) === 3) {
      numberOfJump3++
    }
  }
  return numberOfJump1 * numberOfJump3
}

module.exports = { solve }
