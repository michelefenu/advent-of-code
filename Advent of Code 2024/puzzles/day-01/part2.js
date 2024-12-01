function solve(input) {
  let similarity = 0;
  let firstList = [];
  let secondList = [];

  for (const line of input) {
    const numbers = line.split('   ');

    if (numbers[0] && numbers[1]) {
      firstList.push(numbers[0]);
      secondList.push(numbers[1]);
    }
  }

  for(let item of firstList) {
    
    const occurences = secondList.reduce((acc, curr) => acc + (curr === item ? 1 : 0), 0);
    similarity += item * occurences;
  }

  return similarity;
}

module.exports = { solve }
