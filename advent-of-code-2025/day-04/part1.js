const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const grid = data.map(x => x.split(''));

function countAdjacentRolls(x, y) {
  let adjacentRolls = 0;

  for(let i of [-1,0,1]) {
    for(let j of [-1,0,1]) {
      if(i !== 0 || j !== 0) {
        if(grid[x+i] && grid[x+i][y+j] === '@') {
          adjacentRolls++;
        }
      }
    }
  }
  return adjacentRolls;
}

let forkableRolls = 0;
const forkPlan = [];

for(let i = 0; i< grid.length; i++) {
  forkPlan.push([]);
  for(let j = 0; j<grid[i].length; j++) {
    if(grid[i][j] === '@' && countAdjacentRolls(i, j) < 4) {
      forkableRolls++;
      forkPlan[i].push('x');
    } else {
      forkPlan[i].push(grid[i][j]);
    }
  }
}

//console.table(forkPlan);
console.log(forkableRolls);


