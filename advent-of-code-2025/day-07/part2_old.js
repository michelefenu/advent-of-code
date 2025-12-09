const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
let grid = data.map(x => x.split('').map(y => ({ c: y, dir: y === '^' ? -1 : null })));
let splits = [];

//let splitConfig = grid.map(x => x.filter(y => y.c === '^').map(z => z.dir).join('')).join('');
let splitConfig = null;
let gridConfigs = [];
let confCount = 0;
do{
  // Clean previous paths
  grid.forEach(x => x.forEach(y => y.c = y.c === '|' ? '.' : y.c ));
  if(splitConfig) {
    splits.push(splitConfig);
  }
  for(let row=1; row<grid.length; row++) {
    for(let col=0; col<grid[row].length; col++) {
      if(grid[row][col].c === '.' && grid[row-1][col].c === '|' || grid[row-1][col].c === 'S') {
        grid[row][col].c = '|';
      } else if(grid[row][col].c === '^' && grid[row-1][col].c === '|') {
        grid[row][col+grid[row][col].dir].c='|';
        grid[row][col].dir *= -1;
      }
    }
  }

  const gridConfig = grid.map(x => x.map(y => y.c).join('')).join('');
  if(!gridConfigs.includes(gridConfig)) {
    gridConfigs.push(gridConfig);
    confCount++;
    console.log(confCount);
  }
  //console.log(gridConfig);
  splitConfig = grid.map(x => x.filter(y => y.c === '^').map(z => z.dir).join('')).join('');
  //console.table(grid.map(x => x.map(y => y.c)));
  //console.log(splitConfig);
} while(!splits.includes(splitConfig));

console.log('Total splits: ', confCount);
