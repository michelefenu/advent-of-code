const adventCoin = require('../../modules/advent-coin');

function solve(input) {
  return adventCoin.mine(input, 6);
}

module.exports = { solve }