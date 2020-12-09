class ValidationResult {
  constructor(valid, errors) {
    this.valid = valid || true
    this.errors = errors || []
  }
}

/**
 * 
 * @param {string[]} transmission 
 * @param {number} preambleLength 
 */
const validateTransmission = (transmission, preambleLength) => {
  transmission = transmission.map(x => parseInt(x))

  const validationResult = new ValidationResult()

  for (let i = preambleLength; i < transmission.length; i++) {

    const preamble = transmission.slice(i - 25, i)
    const digit = transmission[i]

    const isDigitValid = checkDigitValidity(preamble, digit)

    if (!isDigitValid) {
      validationResult.valid = false
      validationResult.errors = [digit, ...validationResult.errors]
    }
  }

  return validationResult
}

/**
 * 
 * @param {string[]} transmission 
 * @param {number} invalidEntry the invalid digit of the transmission
 */
const breakCypher = (transmission, invalidEntry) => {
  transmission = transmission.map(x => parseInt(x))

  for (const [index, value] of transmission.entries()) {
    let position = index;
    let result = 0

    while (result + transmission[position] <= invalidEntry) {
      result = result + transmission[position]
      position = position + 1
    }

    if (result === invalidEntry) {
      const range = transmission.slice(index, position).sort((a, b) => a - b)
      return range[0] + range[range.length - 1]
    }
  }

  return -1
}


/**
 * 
 * @param {number[]} preamble 
 * @param {number} digit the digit to be checked for validity
 */
function checkDigitValidity(preamble, digit) {
  for (const [index, value] of preamble.entries()) {
    const isValid = preamble.indexOf(digit - value) !== -1 && preamble.indexOf(digit - value) !== index

    if (isValid) {
      return true
    }
  }
  return false
}

module.exports = {
  validateTransmission,
  breakCypher,
  ValidationResult
}
