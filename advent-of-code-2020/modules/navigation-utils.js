const shipDirection = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0]
}

const cardinalPoints = ['N', 'E', 'S', 'W']

/**
 * 
 * @param {string} password 
 * @param {string} rule 
 */
const getManhattanDistance = (navigationInstructions) => {

  navigationInstructions = navigationInstructions.map(x => ({ name: x[0], action: shipDirection[x[0]], value: parseInt(x.slice(1)) }))

  let shipBow = { name: 'E', shipDirection: shipDirection.E }
  const shipStartPosition = [0, 0]
  let shipPosition = shipStartPosition
  let shipVelocity = 0


  for (let navigationInstruction of navigationInstructions) {
    switch (navigationInstruction.name) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        const action = [navigationInstruction.action[0] * navigationInstruction.value, navigationInstruction.action[1] * navigationInstruction.value]
        shipPosition = applyAction(shipPosition, action)
        break
      case 'L':
      case 'R':
        shipBow = applyDirection(shipBow.name, navigationInstruction.name, navigationInstruction.value)
        break
      case 'F':
        shipVelocity = navigationInstruction.value
        shipPosition = applyVelocity(shipPosition, shipBow.shipDirection, shipVelocity)
        break
    }
  }

  return Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]) 
}

/**
 * 
 * @param {string} password 
 * @param {string} rule 
 */
const getManhattanDistanceNewInstructions = (navigationInstructions) => {

  navigationInstructions = navigationInstructions.map(x => ({ name: x[0], action: shipDirection[x[0]], value: parseInt(x.slice(1)) }))

  let wayPointPosition = [10, 1]
  let shipVelocity = 0

  let shipPosition = [0, 0]


  for (let navigationInstruction of navigationInstructions) {
    switch (navigationInstruction.name) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        const action = [navigationInstruction.action[0] * navigationInstruction.value, navigationInstruction.action[1] * navigationInstruction.value]
        wayPointPosition = applyAction(wayPointPosition, action)
        break
      case 'L':
      case 'R':
        wayPointPosition = applyDirectionWaypoint(wayPointPosition, navigationInstruction.name, navigationInstruction.value)
        break
      case 'F':
        shipVelocity = navigationInstruction.value
        shipPosition = applyWayPointVelocity(wayPointPosition, shipPosition, shipVelocity)
        break
    }
  }

  return Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]) 
}

function applyVelocity(shipPosition, shipBow, shipVelocity) {
  const action = [shipBow[0] * shipVelocity, shipBow[1] * shipVelocity]
  return applyAction(shipPosition, action)
}

function applyWayPointVelocity(wayPointPosition, shipPosition, shipVelocity) {
  return [shipPosition[0] + wayPointPosition[0] * shipVelocity, shipPosition[1] + wayPointPosition[1] * shipVelocity]
}

function applyAction(shipPosition, action) {
  return [shipPosition[0] + action[0], shipPosition[1] + action[1]]
}

function applyDirection(shipBow, actionName, actionValue) {
  const offset = (actionName === 'R' ? 1 : -1) * (actionValue / 90)
  const currentBow = cardinalPoints.indexOf(shipBow)
  const newBow = cardinalPoints[((currentBow + offset) % 4 + 4) % 4]

  return { name: newBow, shipDirection: shipDirection[newBow] }
}

function applyDirectionWaypoint(wayPointPosition, actionName, actionValue) {
  const angle = actionName === 'R' ? actionValue : -1 * actionValue
  return rotate(0, 0, wayPointPosition[0], wayPointPosition[1], angle)
}

function rotate(cx, cy, x, y, angle) {
  const radians = (Math.PI / 180) * angle
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)

  const nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx)
  const ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy)
  return [nx, ny];
}


module.exports = {
  getManhattanDistance,
  getManhattanDistanceNewInstructions
}