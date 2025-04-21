const joltageUtils = require('../../modules/joltage-utils')

function solve(input) {
  input = input.map(x => parseInt(x))

  let adaptersChain = joltageUtils.getAdaptersChain(input)
  adaptersChain = [0, ...adaptersChain]
  
  // [1, 0, 0, 0] Only one way to get to the first number
  const pahts = new Array(adaptersChain.length).fill(0)
  pahts[0] = 1

  for (let i = 1; i < adaptersChain.length; i++) {
    for (let j = i - 3; j < i; j++) {
      // if youcan jump from i - j to i,
      // sum ways to get to i-1, i-2, i-3
      if (adaptersChain[i] - adaptersChain[j] <=  3) {
        pahts[i] += pahts[j]
      } 
    }
  }

  return pahts[pahts.length - 1]
}

module.exports = { solve }
