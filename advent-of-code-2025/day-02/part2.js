const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const ranges = data[0].split(',').map(x => x.split('-').map(x => +x));
function isValid(id) {
  id = `${id}`;

  let div = 2;
  let length = id.length;

  while(div <= length) {
    if(length % div === 0) {
      const split = length / div;
      const regex = new RegExp(`.{1,${split}}`, 'g');
      const groups = [...new Set(id.match(regex))];
      if(groups.length === 1) {
        return false;
      }
    }
    div = div + 1;
  }
  return true;
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
