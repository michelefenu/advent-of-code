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
const OP_JUMP_IF_TRUE = 5;
const OP_JUMP_IF_FALSE = 6;
const OP_LESS_THAN = 7;
const OP_EQUALS = 8;
const OP_HALT = 99;

const TEST_CODE = 5;

let position, value, pointer, offset, nextPointer;

[pointer, offset, nextPointer] = getInstruction(0, puzzleInput[0]);

while (puzzleInput[pointer] !== OP_HALT) {

    const opcode = puzzleInput.slice(pointer, pointer + offset);

    [position, value] = applyOpCode(opcode, puzzleInput, pointer);

    if (typeof (value) !== 'null') {
        puzzleInput[position] = value;
    }

    [pointer, offset, nextPointer] = getInstruction(nextPointer, puzzleInput[nextPointer]);
}


function applyOpCode(opcode, puzzleInput) {
    let outputPosition = opcode[3];
    const parameterModes = opcode[0].toString().padStart(5, '0').split('');

    const operation = +(parameterModes[3] + parameterModes[4]);
    const param1Mode = +parameterModes[2];
    const param2Mode = +parameterModes[1];
    const param3Mode = +parameterModes[0];

    let value;
    const param1 = param1Mode ? opcode[1] : puzzleInput[opcode[1]];
    const param2 = param2Mode ? opcode[2] : puzzleInput[opcode[2]];
    const param3 = param3Mode ? opcode[3] : puzzleInput[opcode[3]];

    switch (operation) {
        case OP_ADD:
            value = param1 + param2;
            break;
        case OP_MULT:
            value = param1 * param2;
            break;
        case OP_LESS_THAN:
            value = param1 < param2 ? 1 : 0;
            break;
        case OP_EQUALS:
            value = param1 === param2 ? 1 : 0;
            break;
        case OP_JUMP_IF_TRUE:
        case OP_JUMP_IF_FALSE:
            value = null;
            outputPosition = null;
            break;
        case OP_INPUT:
            console.log(`Input: ${TEST_CODE}`);
            outputPosition = opcode[1];
            value = TEST_CODE;
            break;
        case OP_OUTPUT:
            console.log(`Output: ${param1}`);
            value = null;
            break;
        default:
            console.error(`${opcode[0]} is invalid`);
    }

    return [outputPosition, value];
}

function getInstruction(currentPointer, opcode) {
    let parameterModes = opcode.toString().padStart(5, '0').split('');
    let operation = +(parameterModes[3] + parameterModes[4]);
    const param1Mode = +parameterModes[2];
    const param2Mode = +parameterModes[1];
    const param3Mode = +parameterModes[0];
    let instructionOffset = 4;
    let instructionPointer = currentPointer;
    let nextInstructionPointer = currentPointer;

    const param1 = param1Mode ? puzzleInput[currentPointer + 1] : puzzleInput[puzzleInput[currentPointer + 1]];
    const param2 = param2Mode ? puzzleInput[currentPointer + 2] : puzzleInput[puzzleInput[currentPointer + 2]];

    switch (operation) {
        case OP_ADD:
        case OP_MULT:
        case OP_LESS_THAN:
        case OP_EQUALS:
            instructionOffset = 4;
            nextInstructionPointer = instructionPointer + instructionOffset;
            break;
        case OP_INPUT:
        case OP_OUTPUT:
            instructionOffset = 2;
            nextInstructionPointer = instructionPointer + instructionOffset;
            break;
        case OP_JUMP_IF_TRUE:
            instructionOffset = 3;
            nextInstructionPointer = param1 ? param2 : nextInstructionPointer + instructionOffset;
            break;
        case OP_JUMP_IF_FALSE:
            instructionOffset = 3;
            nextInstructionPointer = !param1 ? param2 : nextInstructionPointer + instructionOffset;
            break;
        default:
            break;
    }

    return [instructionPointer, instructionOffset, nextInstructionPointer];
}
