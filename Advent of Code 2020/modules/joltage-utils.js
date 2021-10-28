/**
 * @param {number[]} adapters
 */
const getAdaptersChain = (adapters) => {

  return adapters.sort((a, b) => a - b)
}

module.exports = {
  getAdaptersChain
}
