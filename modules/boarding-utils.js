/**
 * 
 * @param {string} boardingPass 
 */
const getSeatID = (boardingPass, planeRows, planeCols) => {
  // |       rows        |  cols  |
  // [F, B, F, B, B, F, F, R, L, R]
  const seatPath = boardingPass.split('')
  const rowPath = boardingPass.slice(0, 7)
  const colPath = boardingPass.slice(7)

  const row = getRow(rowPath, planeRows)
  const col = getCol(colPath, planeCols)

  return row * 8 + col
}

function getRow(rowPath, planeRows) {
  let i = 0
  let j = planeRows - 1

  for (let step of rowPath) {
    switch (step) {
      case 'F':
        j = Math.floor((j - i) / 2) + i
        break
      case 'B':
        i = Math.floor((j - i) / 2) + i
        break
    }
  }

  return rowPath.length % 2 ? j : i
}

function getCol(colPath, planeCols) {
  let i = 0
  let j = planeCols - 1

  for (let step of colPath) {
    switch (step) {
      case 'L':
        j = Math.floor((j - i) / 2) + i
        break
      case 'R':
        i = Math.floor((j - i) / 2) + i
        break
    }
  }
  return colPath.length % 2 ? j : i
}

module.exports = {
  getSeatID
}