const utils = require('../../modules/utils')

function solve(input) {
  const problemInput = input.map(x => +x)
  const result = utils.findPairThatSumsTo(problemInput, 2020)

  const firstNumber = result[0].value
  const secondNumber = result[1].value

  return firstNumber * secondNumber
}

module.exports = { solve }
