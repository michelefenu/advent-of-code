const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution

const banks = data;


function findMaxJoltage(bank) {
  const stack = [];
  let drops = bank.length-12;

  // Use a monotonic stack to find the max
  for(let digit of bank.split('').map(x => +x)) {
    while(drops > 0 && stack.length !== 0 && stack[stack.length-1] < digit ) {
      stack.pop();
      drops--;
    }
    stack.push(digit);
  }

  return +stack.join('').slice(0,12);
}

let totalJoltage = 0;

for(let bank of banks) {
  totalJoltage = totalJoltage + findMaxJoltage(bank);
}

console.log(totalJoltage);
