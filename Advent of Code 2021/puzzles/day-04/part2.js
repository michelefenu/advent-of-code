const bingoUtils = require('../../modules/bingo-utils');

function solve(input) {
  return bingoUtils.getLatestWinnerBoardScore(input);
}

module.exports = { solve }