const bingoUtils = require('../../modules/bingo-utils');

function solve(input) {
  return bingoUtils.getWinnerScore(input);
}

module.exports = { solve }