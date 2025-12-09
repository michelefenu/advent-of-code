const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const grid = data.map(x => x.split('').map(y => ({ c: y })));
let splits = 0;
for(let row=1; row<grid.length; row++) {
  for(let col=0; col<grid[row].length; col++) {
    if(grid[row][col].c === '.' && grid[row-1][col].c === '|' || grid[row-1][col].c === 'S') {
      grid[row][col].c = '|';
      splits++;
    }else if(grid[row][col].c === '^' && grid[row-1][col].c === '|') {
      if(grid[row][col-1].c === '|') splits++;
      grid[row][col-1].c='|';
      grid[row][col+1].c='|';
      splits++;
    }
  }
}

console.log('Total splits: ', splits/2);
