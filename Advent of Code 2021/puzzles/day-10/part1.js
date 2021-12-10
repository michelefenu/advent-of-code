const navSubsystemUtils = require("../../modules/nav-subsystem-utils");

function solve(input) {
  return navSubsystemUtils.removeCorruptedLines(input).errorScore;
}

module.exports = { solve };
