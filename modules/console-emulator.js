const OP = {
  NOP: 'nop',
  ACC: 'acc',
  JMP: 'jmp'
}

/**
 * @param {string[]} code a console program
 */
const executeProgram = (code) => {
  const program = getProgram(code)

  let accumulator = 0
  let pointer = 0

  while (pointer < program.length && !program[pointer].executed) {
    const line = program[pointer]

    switch (line.op) {
      case OP.ACC:
        accumulator = accumulator + line.arg
        pointer = pointer + 1
        break
      case OP.JMP:
        pointer = pointer + line.arg
        break
      case OP.NOP:
        pointer = pointer + 1
        break
      default:
        throw 'Op not found'
    }
    line.executed = true
  }

  return { accumulator, aborted: pointer < program.length }
}

const getProgram = (code) => {
  return code.map(line => new Instruction(line))
}

class Instruction {
  constructor(line) {
    this.op = line.split(' ')[0]
    this.arg = parseInt(line.split(' ')[1])
    this.executed = false
  }
}

module.exports = {
  executeProgram,
  getProgram,
  OP
}