const formUtils = require('../../modules/form-utils')

function solve(input) {
  const yesAnswers = formUtils.getTotalCommonYesAnswers(input)
  
  return yesAnswers
}

module.exports = { solve }
