const smokeUtils = require("../../modules/smoke-utils");

function solve(input) {
  return smokeUtils.getLowerPoints(input).totalRiskLevel;
}

module.exports = { solve };
