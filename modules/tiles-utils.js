const findBordersIds = (tiles) => {
  const borderTiles = []

  for(let tile of tiles) {
    if(isBorderTile(tile.id, tiles)) {
      borderTiles.push(tile.id)
    }
  }

  return borderTiles
}

const buildPhoto = (tiles) => {
  for(let tile of tiles) {
  let matchingBorders = 0

    for(let border of tile.borders) {
      matchingBorders += tiles.filter(x => x.id !== tile.id).filter(x => matchesAnyBorder(border, x.borders)).length
    }
    console.log(matchingBorders)
  }
}

const isBorderTile = (id, tiles) => {
  const borders = tiles.filter(x => x.id === id)[0].borders

  let matchingBorders = 0
  for(let border of borders) {
    const borderMatch = !!tiles.filter(x => x.id !== id).filter(x => matchesAnyBorder(border, x.borders)).length
    if(borderMatch) {
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
  let bottomBorder = tile[tile.length -1]

  for(let row of tile) {
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