const exaTilesUtils = require('../../modules/exa-tiles-utils.js')

function solve(input) {
  const directions = input
    .map(x => x.split('').join('$')
    .replace(/s\$e/g, 'se')
    .replace(/s\$w/g, 'sw')
    .replace(/n\$w/g, 'nw')
    .replace(/n\$e/g, 'ne')
    .split('$'))

    const initialStatus = exaTilesUtils.flipTiles(directions)
    return exaTilesUtils.runExibit(initialStatus, 100)
}

module.exports = { solve }
