const tilesUtils = require('../../modules/tiles-utils')

function solve(input) {
  const tiles = input
    .join('$')
    .split('$$')
    .map(x => (
      { 
        id: x.split('$')[0].split(' ')[1].split(':')[0],
        tile: x.split('$').slice(1),
        borders: tilesUtils.getBorders(x.split('$').slice(1))
      }
    ))

  return tilesUtils.findBordersIds(tiles).reduce((acc, val) => acc * parseInt(val), 1)
}

module.exports = { solve }
