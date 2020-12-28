const findBordersIds = (tiles) => {
  const borderTiles = []

  for (let tile of tiles) {
    if (isBorderTile(tile.id, tiles)) {
      borderTiles.push(tile.id)
    }
  }

  return borderTiles
}

const buildPhoto = (tiles) => {
  const tilesMap = new Map()

  for (let tile of tiles) {
    tilesMap.set(tile.id, tile)
  }

  // Find topLeftTile
  let borderTileId
  for (let tile of tiles) {
    if (isBorderTile(tile.id, tiles)) {
      borderTileId = tile.id
      break
    }
  }

  while (getMatchingBorders(borderTileId, tilesMap).join('') !== '12') {
    tilesMap.set(borderTileId, rotateCC(tilesMap.get(borderTileId)))
  }

  const cornerTile = tilesMap.get(borderTileId)
  cornerTile.done = true

  const puzzle = [[cornerTile]]

  let row = 0;
  let col = 0;

  while(true) {

    const currentTile = puzzle[row][col]
    let matchingTile
    while (true) {
      const rightBorder = currentTile.borders[1]

      matchingTile = findMatchingTile(currentTile.id, rightBorder, tilesMap)
      tilesMap.set(matchingTile.id, flipV(tilesMap.get(matchingTile.id)))
      if (rightBorder === matchingTile.borders[3])
        break;

      tilesMap.set(matchingTile.id, flipH(tilesMap.get(matchingTile.id)))
      matchingTile = findMatchingTile(currentTile.id, rightBorder, tilesMap)

      if (rightBorder === matchingTile.borders[3])
        break;


      tilesMap.set(matchingTile.id, rotateCC(tilesMap.get(matchingTile.id)))
      matchingTile = findMatchingTile(currentTile.id, rightBorder, tilesMap)

      if (rightBorder === matchingTile.borders[3])
        break;

    }
    col++
    matchingTile.done = true
    puzzle[row][col] = matchingTile

    tilesMap.set(matchingTile.id, matchingTile)
    if (!getMatchingBorders(matchingTile.id, tilesMap).join('').includes('1')) {
      if (!getMatchingBorders(matchingTile.id, tilesMap).join('').includes('2')) {
        break
      }

      //find new starter line
      const startCurrentTile = puzzle[row][0]
      const bottomBorder = puzzle[row][0].borders[2]

      let newStartedTile

      while (true) {
        newStartedTile = findMatchingTile(startCurrentTile.id, bottomBorder, tilesMap)
        if (bottomBorder === newStartedTile.borders[0])
          break;

        tilesMap.set(newStartedTile.id, flipH(tilesMap.get(newStartedTile.id)))
        newStartedTile = findMatchingTile(startCurrentTile.id, bottomBorder, tilesMap)
        
        if (bottomBorder === newStartedTile.borders[0])
          break;

        tilesMap.set(newStartedTile.id, flipV(tilesMap.get(newStartedTile.id)))
        newStartedTile = findMatchingTile(startCurrentTile.id, bottomBorder, tilesMap)

        if (bottomBorder === newStartedTile.borders[0])
          break;

        tilesMap.set(newStartedTile.id, rotateCC(tilesMap.get(newStartedTile.id)))
      }

      newStartedTile.done = true
      row++
      col = 0
      puzzle[row] = []
      puzzle[row][col] = newStartedTile
      tilesMap.set(newStartedTile.id, newStartedTile)

    }

  }

  // Here we have the puzzle!!!

}


const findMatchingTile = (id, border, tiles) => {
  return [...tiles.values()].filter(x => x.id !== id).filter(x => matchesAnyBorder(border, x.borders))[0]
}

const rotateCC = (tile) => {
  const rotatedTile = { id: tile.id, tile: [], borders: [] }

  for (let i = 0; i < tile.tile[0].length; i++) {
    let row = ''
    for (let line of tile.tile) {
      row = line[i] + row
    }
    rotatedTile.tile.push(row)
  }

  rotatedTile.borders = getBorders(rotatedTile.tile)

  return rotatedTile
}

const flipV = (tile) => {
  const flippedTile = { id: tile.id, tile: [], borders: [] }
  flippedTile.tile = tile.tile.reverse()
  flippedTile.borders = getBorders(flippedTile.tile)

  return flippedTile
}

const flipH = (tile) => {
  const flippedTile = { id: tile.id, tile: [], borders: [] }
  flippedTile.tile = tile.tile.map(x => x.split('').reverse('').join(''))
  flippedTile.borders = getBorders(flippedTile.tile)
  return flippedTile
}

const toScreen = (tile) => {
  return tile.tile.join('\n') + '\n'
}

const isBorderTile = (id, tiles) => {
  const borders = tiles.filter(x => x.id === id)[0].borders

  let matchingBorders = 0
  for (let border of borders) {
    const borderMatch = !!tiles.filter(x => x.id !== id).filter(x => matchesAnyBorder(border, x.borders)).length
    if (borderMatch) {
      matchingBorders++
    }
  }

  return matchingBorders === 2
}

const getMatchingBorders = (id, tiles) => {
  const borders = tiles.get(id).borders

  let matchingBorders = []
  for (let i = 0; i < 4; i++) {
    const borderMatch = !![...tiles.values()].filter(x => x.id !== id).filter(x => matchesAnyBorder(borders[i], x.borders)).length
    if (borderMatch) {
      matchingBorders.push(i)
    }
  }

  return matchingBorders
}

const matchesAnyBorder = (border, borders) => {
  return borders.indexOf(border) !== -1 || borders.indexOf(border.split('').reverse().join('')) !== -1
}

const getBorders = (tile) => {
  let leftBorder = ''
  let rightBorder = ''
  let topBorder = tile[0]
  let bottomBorder = tile[tile.length - 1]

  for (let row of tile) {
    leftBorder += row[0]
    rightBorder += row[row.length - 1]
  }

  return [topBorder, rightBorder, bottomBorder, leftBorder]
}

module.exports = {
  findBordersIds,
  getBorders,
  buildPhoto
}