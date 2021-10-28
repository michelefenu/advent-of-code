const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split(',')
    .map(x => +x);

const OP_ADD = 1;
const OP_MULT = 2;
const OP_HALT = 99;

const STABLE_VALUE = 19690720;

solution_found:
for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        let puzzleOutput = calculateOutput(noun, verb);
        if (puzzleOutput === STABLE_VALUE) {
            let answer = 100 * noun + verb;
            console.log(answer);
            break solution_found;
        }
    }
}

function calculateOutput(noun, verb) {
    let workingMemory = puzzleInput.slice();

    // set initial parameters
    workingMemory[1] = noun;
    workingMemory[2] = verb;

    let position, value;

    for (let i = 0; workingMemory[i] !== OP_HALT; i = i + 4) {
        let opcode = workingMemory.slice(i, i + 4);
        [position, value] = applyOpcode(opcode, workingMemory);
        workingMemory[position] = value;
    }

    return workingMemory[0];
}

function applyOpcode(opcode, workingMemory) {

    let outputPosition = opcode[3];
    let value;

    switch (opcode[0]) {
        case OP_ADD:
            value = workingMemory[opcode[1]] + workingMemory[opcode[2]];
            break;
        case OP_MULT:
            value = workingMemory[opcode[1]] * workingMemory[opcode[2]];
            break;
        default:
            console.error(`${opcode[0]} is invalid`);
    }

    return [outputPosition, value]
}
