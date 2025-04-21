const getActiveCubes = (initialState, numberOfCycles) => {
  let spaceMap = initializeMap(initialState)
  let workMap = new Map(spaceMap)

  for (let cycle = 1; cycle <= numberOfCycles; cycle++) {
    let limit = cycle + numberOfCycles
    spaceMap = new Map(workMap)
    for (let x = -limit; x <= limit; x++) {
      for (let y = -limit; y <= limit; y++) {
        for (let z = -limit; z <= limit; z++) {
          const cube = spaceMap.get(`${x}$${y}$${z}`) || false
          const activeNeighbors = getActiveNeighbors(getCoordinatesFromString(`${x}$${y}$${z}`), spaceMap)
          /* 
          If a cube is active and exactly 2 or 3 of its neighbors are also active, 
          the cube remains active. Otherwise, the cube becomes inactive.
          If a cube is inactive but exactly 3 of its neighbors are active, 
          the cube becomes active. Otherwise, the cube remains inactive.
          */

          let status
          if (cube) {
            status = activeNeighbors >= 2 && activeNeighbors <= 3
          } else {
            status = activeNeighbors === 3
          }

          workMap.set(`${x}$${y}$${z}`, status)
        }
      }
    }
  }

  return [...workMap.values()].filter(x => !!x).length
}

const getActiveCubes4D = (initialState, numberOfCycles) => {
  let spaceMap = initializeMap4D(initialState)
  let workMap = new Map(spaceMap)

  for (let cycle = 1; cycle <= numberOfCycles; cycle++) {

    let limit = cycle + numberOfCycles
    spaceMap = new Map(workMap)

    for (let x = -limit; x <= limit; x++) {
      for (let y = -limit; y <= limit; y++) {
        for (let z = -limit; z <= limit; z++) {
          for (let w = -limit; w <= limit; w++) {
            const cube = spaceMap.get(`${x}$${y}$${z}$${w}`) || false
            const activeNeighbors = getActiveNeighbors4D(getCoordinatesFromString4D(`${x}$${y}$${z}$${w}`), spaceMap)
            /* 
            If a cube is active and exactly 2 or 3 of its neighbors are also active, 
            the cube remains active. Otherwise, the cube becomes inactive.
            If a cube is inactive but exactly 3 of its neighbors are active, 
            the cube becomes active. Otherwise, the cube remains inactive.
            */

            let status
            if (cube) {
              status = activeNeighbors >= 2 && activeNeighbors <= 3
            } else {
              status = activeNeighbors === 3
            }

            workMap.set(`${x}$${y}$${z}$${w}`, status)
          }
        }
      }
    }
  }
  
  return [...workMap.values()].filter(x => !!x).length
}

function getActiveNeighbors(coords, spaceMap) {
  let activeNeighbors = 0

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const isCurrentCube = x === 0 && y === 0 && z === 0
        const isCubeActive = spaceMap.get(`${coords.x + x}$${coords.y + y}$${coords.z + z}`)
        if (!isCurrentCube && isCubeActive) {
          activeNeighbors++
        }
      }
    }
  }

  return activeNeighbors
}

function getActiveNeighbors4D(coords, spaceMap) {
  let activeNeighbors = 0

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          const isCurrentCube = x === 0 && y === 0 && z === 0 && w === 0
          const isCubeActive = spaceMap.get(`${coords.x + x}$${coords.y + y}$${coords.z + z}$${coords.w + w}`)
          if (!isCurrentCube && isCubeActive) {
            activeNeighbors++
          }
        }
      }
    }
  }

  return activeNeighbors
}

function getCoordinatesFromString(coords) {
  const points = coords.split('$')

  return {
    x: parseInt(points[0]),
    y: parseInt(points[1]),
    z: parseInt(points[2])
  }
}

function getCoordinatesFromString4D(coords) {
  const points = coords.split('$')

  return {
    x: parseInt(points[0]),
    y: parseInt(points[1]),
    z: parseInt(points[2]),
    w: parseInt(points[3])
  }
}

/**
 * key: x$y$z
 * value: active status
 */
function initializeMap(initialState) {
  const initialMap = new Map()

  for (let x = 0; x < initialState.length; x++) {
    for (let y = 0; y < initialState[0].length; y++) {
      initialMap.set(`${x - 1}$${y - 1}$0`, initialState[x][y] === '#')
    }
  }

  return initialMap
}

/**
 * key: x$y$z
 * value: active status
 */
function initializeMap4D(initialState) {
  const initialMap = new Map()

  for (let x = 0; x < initialState.length; x++) {
    for (let y = 0; y < initialState[0].length; y++) {
      initialMap.set(`${x - 1}$${y - 1}$0$0`, initialState[x][y] === '#')
    }
  }
  
  return initialMap
}

module.exports = {
  getActiveCubes,
  getActiveCubes4D
}
