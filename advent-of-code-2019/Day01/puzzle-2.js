const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split('\n')
    .map(x => +x);

let totalFuelRequired = 0;

puzzleInput.forEach(x => {
    const currentModuleFuel = calculateTotalFuel(x);
    totalFuelRequired = totalFuelRequired + currentModuleFuel;
});

console.log(totalFuelRequired);

function calculateTotalFuel(moduleWeight) {
    let fuelWeight = calculateFuelWeight(moduleWeight);
    let additionalFuel = 0;

    do {
        additionalFuel = additionalFuel + fuelWeight;
        fuelWeight = calculateFuelWeight(fuelWeight);
    } while (fuelWeight > 0);

    return additionalFuel;
}

function calculateFuelWeight(mass) {
    return Math.floor(mass / 3) - 2;
}
