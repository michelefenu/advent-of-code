const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const ranges = data[0].split(',').map(x => x.split('-').map(x => +x));
function isValid(id) {
  id = `${id}`;
  if(id.length % 2 !== 0) return true;

  const first = id.slice(0, id.length/2);
  const second = id.slice(id.length/2, id.length);
  return first !== second;
}

let checksum = 0;

for(let range of ranges) {
  for(let i=range[0]; i<=range[1]; i++) {
    if(!isValid(i)) {
      checksum = checksum + i;
    }
  }
}

console.log(checksum);
