const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split('\n')
    .map(x => +x);

let totalFuelRequired = 0;

puzzleInput.forEach(x => {
    const currentModuleFuel = Math.floor(x / 3) - 2;
    totalFuelRequired = totalFuelRequired + currentModuleFuel;
});

console.log(totalFuelRequired);
