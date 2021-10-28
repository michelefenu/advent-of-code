const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split(',')
    .map(x => +x);

const OP_ADD = 1;
const OP_MULT = 2;
const OP_INPUT = 3;
const OP_OUTPUT = 4;
const OP_HALT = 99;

const TEST_ID = 1;

let position, value;
let nextInstructionOffset = getNextInstructionOffset(puzzleInput[0]);

for (let i = 0; puzzleInput[i] !== OP_HALT; i = i + nextInstructionOffset) {
    nextInstructionOffset = getNextInstructionOffset(puzzleInput[i]);

    let opcode = puzzleInput.slice(i, i + nextInstructionOffset);

    [position, value] = applyOpcode(opcode, puzzleInput);

    if (typeof (value) !== 'null') {
        puzzleInput[position] = value;
    }
}


function applyOpcode(opcode, puzzleInput) {

    let outputPosition = opcode[3];
    const parameterModes = opcode[0].toString().padStart(5, '0').split('');

    const operation = +(parameterModes[3] + parameterModes[4]);
    const param1Mode = +parameterModes[2];
    const param2Mode = +parameterModes[1];
    const param3Mode = +parameterModes[0];

    let value;
    const param1 = param1Mode ? opcode[1] : puzzleInput[opcode[1]];
    const param2 = param2Mode ? opcode[2] : puzzleInput[opcode[2]];

    switch (operation) {
        case OP_ADD:
            value = param1 + param2;
            break;
        case OP_MULT:
            value = param1 * param2;
            break;
        case OP_INPUT:
            console.log(`Input: 1`);
            outputPosition = opcode[1];
            value = TEST_ID;
            break;
        case OP_OUTPUT:
            console.log(`Output: ${param1}`);
            value = null;
            break;
        default:
            console.error(`${opcode[0]} is invalid`);
    }

    return [outputPosition, value]
}

function getNextInstructionOffset(opcode) {
    let parameterModes = opcode.toString().padStart(5, '0').split('');
    let operation = +(parameterModes[3] + parameterModes[4]);
    let nextInstructionOffset = operation === 3 || operation === 4 ? 2 : 4;

    return nextInstructionOffset;
}