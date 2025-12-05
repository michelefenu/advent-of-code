const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(x => !!x);

// Solution
const ranges = data
  .filter(x => x.includes('-'))
  .map(x => ({min: +x.split('-')[0], max: +x.split('-')[1]}));

let cleanedRanges = [ranges[0]];


  let newCleaned = cleanedRanges;
for(let range of ranges) {
  for(let cleanedRange of cleanedRanges) {
//    console.log(range, cleanedRange);
  //  console.log(cleanedRanges);
    // Range incluso in un altro
    console.log('---');
    console.log(range, cleanedRange);
    if(cleanedRange.min === range.min && cleanedRange.max === range.max) continue;
    if(cleanedRange.min < range.min && cleanedRange.max > range.max) {
      console.log('Incluso in altro');
      newCleaned = newCleaned.filter(x => x.min !== range.min && x.max !== range.max);
      // Altro range incluso in quello corrente
    } else if(cleanedRange.min > range.min && cleanedRange.max < range.max) {
      console.log('Incluso in corrente');
      newCleaned = newCleaned.filter(x => x.min !== cleanedRange.min && x.max !== cleanedRange.max);
      !newCleaned.includes(range) && newCleaned.push(range);
      // Range disgiunti
    } else if(cleanedRange.min > range.max || cleanedRange.max < range.min) {
      console.log('Disgiunti');
      !newCleaned.includes(range) && newCleaned.push(range);
      // Min compreso in altro range
    } else if(cleanedRange.min <= range.min && cleanedRange.max >= range.min) {
      console.log('Min compreso in altro range');
      newCleaned = newCleaned.filter(x => x.min !== cleanedRange.min && x.max !== cleanedRange.max);
      range.min = cleanedRange.min;
      !newCleaned.includes(range) && newCleaned.push(range);
      // Max compreso in altro range
    } else if(cleanedRange.min <= range.max && cleanedRange.max >= range.max) {
      console.log('Max compreso in altro range');
      newCleaned = newCleaned.filter(x => x.min !== cleanedRange.min && x.max !== cleanedRange.max);
      range.max = cleanedRange.max;
      !newCleaned.includes(range) && newCleaned.push(range);
    }
  }
    cleanedRanges = [...newCleaned];
    console.log('Res: ', cleanedRanges);
}

//console.log(cleanedRanges);

const totalValid = cleanedRanges.reduce((acc, x) => acc + (x.max - x.min + 1), 0);

console.log('Total valid ids: ', totalValid);
