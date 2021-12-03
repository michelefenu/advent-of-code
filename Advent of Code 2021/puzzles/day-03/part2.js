const diagnosticUtils = require('../../modules/diagnostic-utils');

function solve(input) {
   return diagnosticUtils.getLifeSupportRating(input);
}

module.exports = { solve }