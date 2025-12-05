const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const ranges = data
  .filter(x => x.includes('-'))
  .map(x => ({start: +x.split('-')[0], end: +x.split('-')[1]}));

const ingredients = data.filter(x => !x.includes('-')).map(x => +x);

function isFresh(ingredient) {
  for(let range of ranges) {
    if(range.start <= ingredient && range.end >= ingredient) {
      return true;
    }
  }
  return false;
}

let freshCount = 0;

for(let ingredient of ingredients) {
  if(isFresh(ingredient)) {
    freshCount++;
  }
}

console.log(freshCount);

