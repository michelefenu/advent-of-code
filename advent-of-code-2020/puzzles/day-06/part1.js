const formUtils = require('../../modules/form-utils')

function solve(input) {
  const yesAnswers = formUtils.getTotalYesAnswers(input)
  
  return yesAnswers
}

module.exports = { solve }
