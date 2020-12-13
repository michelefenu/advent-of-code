/**
 * 
 * @param {string} passportData 
 * @param {string[]} validators 
 */
const getEarliestBus = (busIds, timestamp) => {

  const earliestBus = busIds
    .map(busId => ({ id: busId, delay: timestamp % busId }))
    .sort((a, b) => b.delay - a.delay)[0]

  const earliestTime = Math.floor(timestamp / earliestBus.id) * earliestBus.id + earliestBus.id
  
  return (earliestTime - timestamp) * earliestBus.id
}

const solveContest = (busIds) => {
  const shuttles = busIds
    .map((value, index) => [value, index])
    .filter(x => x[0] !== 'x')

  let previousInterval = shuttles[0][0]
  let tick = 0

  for(let shuttle of shuttles.slice(1)) {
    while(!((tick + shuttle[1]) % shuttle[0] === 0)) {
      tick = tick + previousInterval;
    } 
    previousInterval *= shuttle[0];
  }

  return tick
}



module.exports = {
  getEarliestBus,
  solveContest
}