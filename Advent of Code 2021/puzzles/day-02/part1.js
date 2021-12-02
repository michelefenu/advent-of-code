const navigationUtils = require('../../modules/navigation-utils');

function solve(input) {
  const lastPosition = navigationUtils.navigate(input);

  return lastPosition.x * lastPosition.y;
}

module.exports = { solve }