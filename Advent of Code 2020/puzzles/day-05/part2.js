const boardingUtils = require('../../modules/boarding-utils')

function solve(input) {
  const PLANE_ROWS = 128;
  const PLANE_COLS = 8;

  const boardingPasses = input;

  let seatIDs = []

  for (let boardingPass of boardingPasses) {
    const seatID = boardingUtils.getSeatID(boardingPass, PLANE_ROWS, PLANE_COLS)
    seatIDs = [seatID, ...seatIDs]
  }

  seatIDs.sort((a, b) => a - b)

  const emptySeatNeighbours = seatIDs.filter((seatID, index) => {
    return (
      seatIDs[index - 1] && seatID - 1 !== seatIDs[index - 1] || 
      seatIDs[index + 1] && seatID + 1 !== seatIDs[index + 1]
    )
  })

  return emptySeatNeighbours[0] + 1
}

module.exports = { solve }
