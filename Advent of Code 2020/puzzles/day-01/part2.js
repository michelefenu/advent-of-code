const utils = require('../../modules/utils')

function solve(input) {
  const problemInput = input.map(x => +x)
  const result = utils.findThreeValuesThatSumsTo(problemInput, 2020)

  const firstNumber = result[0].value
  const secondNumber = result[1].value
  const thirdNumber = result[2].value

  return firstNumber * secondNumber * thirdNumber
}

module.exports = { solve }
