const fs = require('fs');
const path = require('path');

const ic = require('./intcode-computer-async');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split(',')
    .map(x => +x);

tryPhaseCombination([4,3,2,1,0]);

// console.log(tryPhaseCombination([4,3,2,1,0]))

function tryPhaseCombination(phases) {
    const amp1result = ic.run(puzzleInput, [phases[0], 0]);
    const amp2result = ic.run(puzzleInput, [phases[1], amp1result]);
    const amp3result = ic.run(puzzleInput, [phases[2], amp2result]);
    const amp4result = ic.run(puzzleInput, [phases[3], amp3result]);
    const amp5result = ic.run(puzzleInput, [phases[4], amp4result]);

    return amp5result;
}