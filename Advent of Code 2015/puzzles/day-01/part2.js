const floorUtils = require('../../modules/floor-utils')

function solve(input) {
  const directions = input[0].split('');
  return floorUtils.getFirstBasementAccess(directions);
}

module.exports = { solve }