const smokeUtils = require("../../modules/smoke-utils");

function solve(input) {
  return smokeUtils.calculateBasinsSizes(input);
}

module.exports = { solve };
