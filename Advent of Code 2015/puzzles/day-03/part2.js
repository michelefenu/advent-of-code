const mapUtils = require('../../modules/map-utils');

function solve(input) {
  const santaPath = input[0].split('').filter((value, index) => index % 2 === 0);
  const roboSantaPath = input[0].split('').filter((value, index) => index % 2 !== 0);

  const santaMap = mapUtils.createMap(santaPath);
  const map = mapUtils.createMap(roboSantaPath, santaMap);

  return mapUtils.countHouses(map);
}

module.exports = { solve }