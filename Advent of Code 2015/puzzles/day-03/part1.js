const mapUtils = require('../../modules/map-utils');

function solve(input) {
  const map = mapUtils.createMap(input[0].split(''));
  return mapUtils.countHouses(map);
}

module.exports = { solve }