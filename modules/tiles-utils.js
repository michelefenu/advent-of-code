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
 // Done in matlab
}

const findMatchingTile = (id, border, tiles) => {
  return !!tiles.filter(x => x.id !== id).filter(x => matchesAnyBorder(border, x.borders)).length
}

const rotateCC = (tile) => {
  const rotatedTile = []

  for (let i = 0; i < tile[0].length; i++) {
    let row = ''
    for (let line of tile) {
      row = line[i] + row
    }
    rotatedTile.push(row)
  }

  return rotatedTile
}

const flipV = (tile) => {
  return tile.reverse()
}

const flipH = (tile) => {
  return tile.map(x => x.split('').reverse('').join(''))
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