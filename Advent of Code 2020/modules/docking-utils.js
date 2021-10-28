const boot = (input) => {
  const memory = []
  let mask

  for (let line of input) {
    if (line.includes('mask')) {
      mask = line.split(' = ')[1]
    } else {
      const decodedInstruction = decodeInstruction(line)
      memory[decodedInstruction.address] = applyMask(decodedInstruction.value, mask)
    }
  }

  return sumMemoryEntries(memory)
}

const bootV2 = (input) => {
  const memory = new Map()
  let mask

  for (let line of input) {
    if (line.includes('mask')) {
      mask = line.split(' = ')[1]
    } else {
      const decodedInstruction = decodeInstruction(line)
      for (let memoryAddress of applyMemoryMask(decodedInstruction.address, mask)) {
        memory.set(memoryAddress, decodedInstruction.value)
      }
    }
  }
  return sumMemoryEntriesMap([...memory.values()])
}

const decodeInstruction = function (instruction) {
  const address = parseInt(instruction.split('[')[1].split(']')[0])
  const value = parseInt(instruction.split(' = ')[1])

  return { address, value }
}

const sumMemoryEntries = function (memory) {
  const validEntries = memory.filter(x => !!x)
  return validEntries.reduce((acc, val) => parseInt(val, 2) + acc, 0)
}

const sumMemoryEntriesMap = function (memory) {
  const validEntries = memory.filter(x => !!x)
  return validEntries.reduce((acc, val) => val + acc, 0)
}

/**
 * 
 * @param {*} value decimal value
 * @param {*} mask binary mask
 */
const applyMask = function (value, mask) {
  const binaryValue = (value >>> 0).toString(2).padStart(36, '0')
  const arrayMask = mask.split('')

  return binaryValue.split('').map((val, i) => arrayMask[i] === 'X' ? val : arrayMask[i]).join('')
}

/**
 * 
 * @param {*} address decimal value
 * @param {*} mask binary mask
 */
const applyMemoryMask = function (address, mask) {
  const binaryValue = (address >>> 0).toString(2).padStart(36, '0')
  const arrayMask = mask.split('')

  const floatingValue = binaryValue.split('').map((val, i) => arrayMask[i] === '0' ? val : arrayMask[i])

  const substitutions = 2 ** floatingValue.filter(x => x === 'X').length

  const memoryLocations = []

  for (let i = 0; i < substitutions; i++) {
    const currentSubstitution = (i).toString(2).padStart(Math.log2(substitutions), '0').split('')
    const memoryAddress = [...floatingValue]
    while (currentSubstitution.length) {
      const lastXindex = memoryAddress.lastIndexOf('X')
      memoryAddress[lastXindex] = currentSubstitution.pop()
    }
    memoryLocations.push(parseInt(memoryAddress.join(''), 2))
  }
  return memoryLocations
}

module.exports = {
  boot,
  bootV2
}