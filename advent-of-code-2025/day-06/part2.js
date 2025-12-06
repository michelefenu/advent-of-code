const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const problems = data.slice(0,-1).map(x => x.split(''));
const operations = data[data.length-1]
  .split('')
  .map(x => x.trim())
  .filter(x => !!x);

console.log('Problems: ', operations.length);

let longestLineLength = 0;
for(let line of problems) {
  if(line.length > longestLineLength) {
    longestLineLength = line.length;
  }
}

let op = operations.pop();
let result = op === '*' ? 1 : 0;
let total = 0;
let solvedProblems = 0;
for(let col=longestLineLength-1; col>=0; col--) {
  let emptyCol = true;
  let operand = '';
  for(let row=0; row<data.length-1; row++) {
    if(problems[row][col]?.trim()) {
      operand += problems[row][col];
      emptyCol=false;
    }
  }
  if(!emptyCol && col !== 0) {
    console.log(operand, op);
    if(op === '*') result *= +operand;
    else result += +operand;
  } else {
    if(col === 0) {
      if(op === '*') result *= +operand;
      else result += +operand;
    }
    console.log('Result: ', result);
    total = total + result;
    console.log('Total: ', total);
    solvedProblems++;
    op = operations.pop();
    result = op === '*' ? 1 : 0;
  }

}
console.log('Solved: ', solvedProblems);

console.log(total);
