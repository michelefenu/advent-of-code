const navSubsystemUtils = require("../../modules/nav-subsystem-utils");

function solve(input) {
  return navSubsystemUtils.fixIncomplete(input);
}

module.exports = { solve };
