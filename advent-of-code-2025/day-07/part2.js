const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

function printManifold(grid) {
  for(let row of grid) {
      console.log(row.map(x => x.chr === '|' ? x.count : x.chr).join(''));
    }
}



// Solution
const grid = data
  .map(x => x.split('').map(y => ({ chr: y, count: y === 'S' ? 1 : 0 })));

for(let row=1; row<grid.length; row++) {
  for(let col=0; col<grid[row].length; col++) {
    if(grid[row][col].chr === '.' && grid[row-1][col].chr === '|' || grid[row-1][col].chr === 'S') {
      grid[row][col].chr = '|';
      grid[row][col].count = grid[row-1][col].count;
    }else if(grid[row][col].chr === '^' && grid[row-1][col].chr === '|') {
      grid[row][col-1].chr='|';
      grid[row][col-1].count += (grid[row-1][col].count);
      //grid[row][col-1].count += grid[row-1][col-1].count;

      grid[row][col+1].chr='|';
      grid[row][col+1].count += (grid[row-1][col].count + grid[row-1][col+1].count);
     // grid[row][col+1].count += grid[row-1][col+1].count;

    }
  }
}

//printManifold(grid);

//console.log(grid[grid.length-1]);
const paths = grid[grid.length-1].reduce((acc, val) => acc + val.count, 0);
console.log('Total paths: ', paths);
