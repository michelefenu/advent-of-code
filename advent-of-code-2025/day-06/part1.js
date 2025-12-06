const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const problems = data.map(x => x.split(/ +/).filter(x => !!x));
let total = 0;

// Cycle problems
for(let i=0; i<problems[0].length; i++) {
  // Get problem operand
  const op = problems[problems.length-1][i];
  let result = op === '*' ? 1 : 0;
  for(let j=0; j<problems.length-1; j++) {
    if(op === '*') result = result * +problems[j][i];
    else result = result + +problems[j][i];
  }
  total = total + result;
}

console.log('Total: ', total);
