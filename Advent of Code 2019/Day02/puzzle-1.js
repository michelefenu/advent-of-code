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

let position, value;

// 1202 program alarm
puzzleInput[1] = 12;
puzzleInput[2] = 2;

for (let i = 0; puzzleInput[i] !== OP_HALT; i = i + 4) {
    let opcode = puzzleInput.slice(i, i + 4);
    [position, value] = applyOpcode(opcode, puzzleInput);
    puzzleInput[position] = value;
}

console.log(puzzleInput[0]);

function applyOpcode(opcode, puzzleInput) {

    let outputPosition = opcode[3];
    let value;

    switch (opcode[0]) {
        case OP_ADD:
            value = puzzleInput[opcode[1]] + puzzleInput[opcode[2]];
            break;
        case OP_MULT:
            value = puzzleInput[opcode[1]] * puzzleInput[opcode[2]];
            break;
        default:
            console.error(`${opcode[0]} is invalid`);
    }

    return [outputPosition, value]
}
