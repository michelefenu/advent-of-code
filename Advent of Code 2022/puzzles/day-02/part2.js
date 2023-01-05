const day2 = require('../../modules/day2');

function solve(input) {
  const guide = input.map(x => {
    const [p1, p2] = x.split(' ');
    return {p1, p2}
  });

  return day2.part2(guide);
}

module.exports = { solve }
