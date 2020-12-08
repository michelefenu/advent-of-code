const consoleEmulator = require('../../modules/console-emulator')

function solve(input) {
  return consoleEmulator.executeProgram(input).accumulator
}

module.exports = { solve }
