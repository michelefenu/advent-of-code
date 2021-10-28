const fs = require('fs');
const path = require('path');

const ic = require('./intcode-computer');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split(',')
    .map(x => +x);

const phasePermutations = generatePermutations([0, 1, 2, 3, 4]);

let maxValue = 0;
for (let i = 0; i < phasePermutations.length; i++) {
    const permutationOutput = tryPhaseCombination(phasePermutations[i]);
    if(permutationOutput > maxValue) {
        maxValue = permutationOutput;
    }
}
console.log(maxValue);

function tryPhaseCombination(phases) {
    const amp1result = ic.run(puzzleInput, [phases[0], 0]);
    const amp2result = ic.run(puzzleInput, [phases[1], amp1result]);
    const amp3result = ic.run(puzzleInput, [phases[2], amp2result]);
    const amp4result = ic.run(puzzleInput, [phases[3], amp3result]);
    const amp5result = ic.run(puzzleInput, [phases[4], amp4result]);

    return amp5result;
}

function generatePermutations(array) {
    function p(array, temp) {
        var i, x;
        if (!array.length) {
            result.push(temp);
        }
        for (i = 0; i < array.length; i++) {
            x = array.splice(i, 1)[0];
            p(array, temp.concat(x));
            array.splice(i, 0, x);
        }
    }
    var result = [];
    p(array, []);
    return result;
}
