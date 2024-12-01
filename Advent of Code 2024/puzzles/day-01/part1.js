function solve(input) {
  let distance = 0;
  let firstList = [];
  let secondList = [];

  for (const line of input) {
    const numbers = line.split('   ');
    if(numbers[0] && numbers[1]) {
      firstList.push(numbers[0]);
      secondList.push(numbers[1]);
    }
  }

  firstList.sort((a, b) => a - b);
  secondList.sort((a, b) => a - b);

  for (let i = 0; i < firstList.length; i++) {  
    distance += Math.abs(+firstList[i] - +secondList[i]);
  }

  return distance;
}

module.exports = { solve }
