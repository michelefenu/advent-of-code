const part1 = (input) => {
  let sum = 0;

  for (let line of input) {
    const numbers = line.match(/\d/g);
    const lineNumber = numbers[0] + numbers[numbers.length - 1];

    sum += +lineNumber;
  }

  return sum;
};

const part2 = (input) => {
  const values = {
    1: '1',
    one: '1',
    2: '2',
    two: '2',
    3: '3',
    three: '3',
    4: '4',
    four: '4',
    5: '5',
    five: '5',
    6: '6',
    six: '6',
    7: '7',
    seven: '7',
    8: '8',
    eight: '8',
    9: '9',
    nine: '9',
  };

  let sum = 0;

  for (let line of input) {
    const numbers = line.(/\d|one|two|three|four|five|six|seven|eight|nine/);
    const lineNumber = values[numbers[0]] + values[numbers[numbers.length - 1]];
    console.log(numbers);

    sum += +lineNumber;
  }

  return sum;
};

module.exports = {
  part1,
  part2,
};
