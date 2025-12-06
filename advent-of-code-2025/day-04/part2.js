const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
let grid = data.map(x => x.split(''));

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

let totalForks = 0;
let forkableRolls = 0;
let forkPlan = [];

do {
  forkableRolls = 0;
  forkPlan = [];
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
  const temp = forkPlan;
  forkPlan = grid;
  grid = temp;
  totalForks = totalForks +  forkableRolls;
} while(forkableRolls > 0)

//console.table(forkPlan);
console.log(totalForks);


