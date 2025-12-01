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

const dial = Array(100).fill(0).map((x,i) => i);
let dialPosition = 50;
let zeroCount = 0;

for(let rotation of rotations) {
  for(let i=0; i<Math.abs(rotation); i++) {
    dialPosition = rotation > 0 ? dialPosition + 1 : dialPosition - 1;
    if(dial[(dialPosition+100)%100] === 0) zeroCount++;
  }
}

console.log(zeroCount);
