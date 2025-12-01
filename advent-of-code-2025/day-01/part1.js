const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const rotations = data.map(x => {
  const sign = x[0] === 'L' ? -1 : 1;
  const num = +x.slice(1);

  return num * sign;
});

let dialPosition = 50;
let zeroCount = 0;

for(let rotation of rotations) {
  console.log(dialPosition, zeroCount);
  dialPosition = (dialPosition + rotation + 100) % 100;
  if(dialPosition === 0) zeroCount++;
}

console.log(zeroCount);
