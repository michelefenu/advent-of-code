const consoleEmulator = require('../../modules/console-emulator')

function solve(input) {

  let code = [...input]
  let result = consoleEmulator.executeProgram(code)
  let step = 0

  while (result.aborted) {
    code = tryFixNextOp([...input], step)
    result = consoleEmulator.executeProgram(code)
    step++
  }

  return result.accumulator
}

function tryFixNextOp(code, step) {

  let count = 0

  for (const [index, line] of code.entries()) {
    if (step === count) {
      if (line.includes(consoleEmulator.OP.JMP)) {
        code[index] = line.replace('jmp', 'nop')
      } else if (line.includes(consoleEmulator.OP.NOP)) {
        code[index] = line.replace('nop', 'jmp')
      }
    }
    if (line.includes(consoleEmulator.OP.JMP) || line.includes(consoleEmulator.OP.NOP)) {
      count++
    }
  }
  return code
}

module.exports = { solve }
