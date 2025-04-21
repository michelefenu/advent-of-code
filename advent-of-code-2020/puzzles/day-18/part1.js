const mathUtils = require('../../modules/math-utils')

function solve(input) {

 return input.reduce((acc, expr) => mathUtils.calculate(expr) + acc, 0)
}

module.exports = { solve }
