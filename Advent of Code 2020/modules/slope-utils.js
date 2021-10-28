/**
 * 
 * @param {string[][]} slopeMap 
 * @param {number} dRight 
 * @param {number} dDown 
 */
const countTrees = (slopeMap, dRight, dDown) => {
  const mapWidth = slopeMap[0].length
  let numberOfTrees = 0;

  for (let i = dRight, j = dDown; j < slopeMap.length; i += dRight, j += dDown) {
    if(slopeMap[j][i % mapWidth] === '#') {
      numberOfTrees++
    }
  }

  return numberOfTrees
}

module.exports = {
  countTrees
}