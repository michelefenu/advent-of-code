const fs = require('fs');

const data = fs.readFileSync('inputc.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
let ranges = data.filter(x => x.includes('-'));

// Remove duplicate ranges
ranges = [...new Set(ranges)].map(x => ({min: +x.split('-')[0], max: +x.split('-')[1]}));

let changed = true;


while(changed) {
  changed = false;
  console.log(ranges);
  for(let range of ranges) {
    for(let rangeCheck of ranges) {

      // Itself or deleted
      if(range.deleted || rangeCheck.deleted || rangeCheck.min === range.min && rangeCheck.max === range.max) {

      }
      // Range incluso in un altro
      else if(rangeCheck.min <= range.min && rangeCheck.max >= range.max) {
        range.deleted = true;
        changed = true;
        break;
        // Altro range incluso in quello corrente
      } else if(rangeCheck.min >= range.min && rangeCheck.max <= range.max) {
        rangeCheck.deleted = true;
        changed = true;
        // Range disgiunti
      } else if(rangeCheck.min > range.max || rangeCheck.max < range.min) {
        // Min compreso in altro range
      } else if(rangeCheck.min <= range.min && rangeCheck.max >= range.min) {
        range.min = rangeCheck.min;
        rangeCheck.deleted = true;
        changed = true;
        // Max compreso in altro range
      } else if(rangeCheck.min <= range.max && rangeCheck.max >= range.max) {
        range.max = rangeCheck.max;
        rangeCheck.deleted = true;
        changed = true;
      }
    }
  }
}

ranges = ranges.filter(x => !x.deleted).map(x => `${x.min}-${x.max}`);

ranges = [...new Set(ranges)].map(x => ({min: +x.split('-')[0], max: +x.split('-')[1]}));

console.table(ranges.sort((a,b) => a.min -b.min));

const totalValid = ranges.reduce((acc, x) => acc + (x.max - x.min + 1), 0);

console.log('Total valid ids: ', totalValid);
