

const getSeatStatus = (seatMap, row, col) => {
  switch (seatMap[row][col]) {
    case '.':
      return '.'
    case 'L':
      return getAjacentOccupiedSeats(seatMap, row, col) === 0 ? '#' : 'L'
    case '#':
      return getAjacentOccupiedSeats(seatMap, row, col) < 4 ? '#' : 'L'
  }
}

/**
 * Consider line of sight
 * @param {*} seatMap 
 * @param {*} row 
 * @param {*} col 
 */
const getSeatStatusImproved = (seatMap, row, col) => {
  switch (seatMap[row][col]) {
    case '.':
      return '.'
    case 'L':
      return getAjacentOccupiedSeatsImproved(seatMap, row, col) === 0 ? '#' : 'L'
    case '#':
      return getAjacentOccupiedSeatsImproved(seatMap, row, col) < 5 ? '#' : 'L'
  }
}

/**
 * RULES
 * - If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 * - If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 * - Otherwise, the seat's state does not change. 
 * 
 * @param {*} seatMap 
 * @param {*} row 
 * @param {*} col 
 */
function getAjacentOccupiedSeats(seatMap, row, col) {
  let adjacentOccupiedSeats = 0

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (seatMap[row + i] && seatMap[row + i][col + j] && seatMap[row + i][col + j] === '#') {
        //exclude itself
        if (i !== 0 || j !== 0) {
          adjacentOccupiedSeats++
        }
      }
    }
  }
  return adjacentOccupiedSeats
}

/**
 * Improvement considering line of sight for any direction
 * 
 * RULES
 * - If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 * - If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 * - Otherwise, the seat's state does not change. 
 * 
 * @param {*} seatMap 
 * @param {*} row 
 * @param {*} col 
 */
function getAjacentOccupiedSeatsImproved(seatMap, row, col) {
  //                          |0:L|1:TL|2:T |3:TR|4:R |5:BR|6:B |7:BL|   
  let adjacentOccupiedSeats = ['?', '?', '?', '?', '?', '?', '?', '?']

  let i = 1
  do {
    // Left [row](col - i)
    if (adjacentOccupiedSeats[0] === '?') {
      let value = seatMap[row][col - i]
      if (value && value !== '.') { adjacentOccupiedSeats[0] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[0] = 'L'}
    }

    // Top-Left (row - i)(col - i)
    if (adjacentOccupiedSeats[1] === '?') {
      let value = seatMap[row - i] && seatMap[row - i][col - i]
      if (value && value !== '.') { adjacentOccupiedSeats[1] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[1] = 'L'}
    }

    // Top (row - i)[col]
    if (adjacentOccupiedSeats[2] === '?') {
      let value = seatMap[row - i] && seatMap[row - i][col]
      if (value && value !== '.') { adjacentOccupiedSeats[2] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[2] = 'L'}
    }

    // Top-Right (row - i)(col + i)
    if (adjacentOccupiedSeats[3] === '?') {
      let value = seatMap[row - i] && seatMap[row - i][col + i]
      if (value && value !== '.') { adjacentOccupiedSeats[3] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[3] = 'L'}
    }

    // Right [row](col + i)
    if (adjacentOccupiedSeats[4] === '?') {
      let value = seatMap[row][col + i]
      if (value && value !== '.') { adjacentOccupiedSeats[4] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[4] = 'L'}
    }

    // Bottom-Right (row + i)(col + i)
    if (adjacentOccupiedSeats[5] === '?') {
      let value = seatMap[row + i] && seatMap[row + i][col + i]
      if (value && value !== '.') { adjacentOccupiedSeats[5] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[5] = 'L'}
    }

    // Bottom (row + i)[col]
    if (adjacentOccupiedSeats[6] === '?') {
      let value = seatMap[row + i] && seatMap[row + i][col]
      if (value && value !== '.') { adjacentOccupiedSeats[6] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[6] = 'L'}
    }

    // Bottom-Left (row + i)(col - i)
    if (adjacentOccupiedSeats[7] === '?') {
      let value = seatMap[row + i] && seatMap[row + i][col - i]
      if (value && value !== '.') { adjacentOccupiedSeats[7] = isSeatOccupied(value) ? '#' : 'L' }
      else if(!value) { adjacentOccupiedSeats[7] = 'L'}
    }

    i++
  } while (adjacentOccupiedSeats.filter(x => x === '?').length)
  
  return adjacentOccupiedSeats.filter(x => x === '#').length
}

function isSeatOccupied(status) {
  return status === '#'
}


module.exports = {
  getSeatStatus,
  getSeatStatusImproved
}