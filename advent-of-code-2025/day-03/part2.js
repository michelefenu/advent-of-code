const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution

const banks = data;


function findMaxJoltage(bank) {
  let max = 0;
  // Build pair of numbers and calculate the max
  for(let i=0; i<bank.length-1; i++) {
    for(let j=i+1; j<bank.length; j++) {
      const num = Number(bank[i]+bank[j]);
      if(num > max) max = num;
    }
  }
  console.log(bank, max);
  return max;
}

let totalJoltage = 0;

for(let bank of banks) {
  totalJoltage = totalJoltage + findMaxJoltage(bank);
}

console.log(totalJoltage);
