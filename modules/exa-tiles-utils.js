const flipTiles = (directions) => {
  const flippedTiles = new Set()

  for (let direction of directions) {
    const tile = direction.reduce((prev, step) => {
      const move = getMove(step)
      return [prev[0] + move[0], prev[1] + move[1], prev[2] + move[2]]
    }, [0, 0, 0])

    const tileId = tile.join('$')

    if (flippedTiles.has(tileId)) {
      flippedTiles.delete(tileId)
    } else {
      flippedTiles.add(tileId)
    }
  }

  return flippedTiles
}

const runExibit = (initialStatus, days) => {
  // [x,y,z], isBlack:boolean
  const pavement = new Map()

  for (let tile of initialStatus) {
    pavement.set(tile, true)
  }

  while (days--) {
    const referencePavement = new Map(pavement)

    for (let tileKey of pavement.keys()) {
      const isBlack = pavement.get(tileKey)
      const tilePosition = tileKey.split('$').map(x => parseInt(x))

      const blackNeighbors = getBlackNeigbors(referencePavement, tilePosition)

      if (isBlack) {
        if (blackNeighbors === 0 || blackNeighbors > 2) {
          pavement.set(tileKey, false)
        }
        fillPavement(pavement, tilePosition)
      } else {
        if (blackNeighbors === 2) {
          pavement.set(tileKey, true)
          fillPavement(pavement, tilePosition)
        }
      }
    }
  }
  
  return [...pavement.values()].filter(x => !!x).length
}

const fillPavement = (pavement, tilePosition) => {
  for (let direction of ['e', 'se', 'sw', 'w', 'nw', 'ne']) {
    const directionKey = getMove(direction)
    const directionNeighborKey = getBlackNeigborKey(tilePosition, directionKey)

    if (typeof pavement.get(directionNeighborKey) === 'undefined') {
      pavement.set(directionNeighborKey, false)
    }
  }
}

const getBlackNeigbors = (referencePavement, tilePosition) => {
  let blackNeighbors = 0

  for (let direction of ['e', 'se', 'sw', 'w', 'nw', 'ne']) {
    const directionKey = getMove(direction)
    const directionNeighborKey = getBlackNeigborKey(tilePosition, directionKey)

    if (referencePavement.get(directionNeighborKey)) {
      blackNeighbors++
    }
  }

  return blackNeighbors
}

const getBlackNeigborKey = (tilePosition, directionKey) => {
  const neighborPosition = [tilePosition[0] + directionKey[0], tilePosition[1] + directionKey[1], tilePosition[2] + directionKey[2]]
  return neighborPosition.join('$')
}

const getMove = (direction) => {
  switch (direction) {
    case 'e':
      return [1, -1, 0]
    case 'se':
      return [1, 0, -1]
    case 'sw':
      return [0, 1, -1]
    case 'w':
      return [-1, 1, 0]
    case 'nw':
      return [-1, 0, 1]
    case 'ne':
      return [0, -1, 1]
  }
}

module.exports = {
  flipTiles,
  runExibit
}