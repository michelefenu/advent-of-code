const navigationUtils = require('../../modules/navigation-utils');

function solve(input) {
  const lastSubmarineData = navigationUtils.calculateAim(input);

  return lastSubmarineData.position.x * lastSubmarineData.position.y;
}

module.exports = { solve }