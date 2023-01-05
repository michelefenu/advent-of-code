const day3 = require('../../modules/day3');

function solve(input) {

  const ruckSacs = input
    .map(x => [
      x.substring(0, x.length / 2).split(''),
      x.substring(x.length / 2, x.length).split('')
    ]);

  return day3.part1(ruckSacs);
}

module.exports = { solve }
