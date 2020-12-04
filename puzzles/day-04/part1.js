const passportUtils = require('../../modules/passport-utils')

function solve(input) {
  const validators = [
    { name: 'byr', required: true },
    { name: 'iyr', required: true },
    { name: 'eyr', required: true },
    { name: 'hgt', required: true },
    { name: 'hcl', required: true },
    { name: 'ecl', required: true },
    { name: 'pid', required: true },
    { name: 'cid', required: false }
  ]
  const passportDataList = passportUtils.getPassportDataListFromBatch(input)

  let validPassportsInBatch = 0

  for (let passportData of passportDataList) {
    const notMatchingValidators = passportUtils.validatePassportFieldNames(passportData, validators)

    const validationErrors = notMatchingValidators
      .filter(x => x.required).length

    if (!validationErrors) {
      validPassportsInBatch++
    }
  }

  return validPassportsInBatch
}

module.exports = { solve }
