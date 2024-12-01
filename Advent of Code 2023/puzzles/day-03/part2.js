const day3 = require('../../modules/day3');

function solve(input) {

  const groups = [];

  for (let i = 0; i < input.length - 2; i = i + 3) {
    groups.push([input[i].split(''), input[i + 1].split(''), input[i + 2].split('')])
  }

  return day3.part2(groups);
}

module.exports = { solve }
