const boardingUtils = require('../../modules/boarding-utils')

function solve(input) {
  const PLANE_ROWS = 128;
  const PLANE_COLS = 8;

  const boardingPasses = input;

  let maxSeatID = 0

  for(let boardingPass of boardingPasses) {
    const seatID = boardingUtils.getSeatID(boardingPass, PLANE_ROWS, PLANE_COLS)
    maxSeatID = seatID > maxSeatID ? seatID : maxSeatID
  }

  return maxSeatID
}

module.exports = { solve }
