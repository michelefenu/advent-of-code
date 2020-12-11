const seatsUtils = require('../../modules/seats-utils')

function solve(input) {
  const seatMap = input.map(x => x.split(''))

  let workingSeatMap = []

  do {
    workingSeatMap = JSON.parse(JSON.stringify(seatMap))

    for (let row = 0; row < workingSeatMap.length; row++) {
      for (let col = 0; col < workingSeatMap[row].length; col++) {
        seatMap[row][col] = seatsUtils.getSeatStatus(workingSeatMap, row, col)
      }
    }
  } while (!JSON.stringify(seatMap).includes(JSON.stringify(workingSeatMap)))

  return seatMap.flat().filter(x => x==='#').length
}

module.exports = { solve }
