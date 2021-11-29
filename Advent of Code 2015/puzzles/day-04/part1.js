const adventCoin = require('../../modules/advent-coin');

function solve(input) {
  return adventCoin.mine(input, 5);
}

module.exports = { solve }