const { ValidatorType, CustomValidators } = require('../../modules/passport-utils')
const passportUtils = require('../../modules/passport-utils')

function solve(input) {
  const validators = [
    {
      name: 'byr', required: true, dataValidators: [
        { type: ValidatorType.MinLength, rule: 4 },
        { type: ValidatorType.NumericRange, rule: { min: 1920, max: 2002 } }
      ]
    },
    {
      name: 'iyr', required: true, dataValidators: [
        { type: ValidatorType.MinLength, rule: 4 },
        { type: ValidatorType.NumericRange, rule: { min: 2010, max: 2020 } }
      ]
    },
    {
      name: 'eyr', required: true, dataValidators: [
        { type: ValidatorType.MinLength, rule: 4 },
        { type: ValidatorType.NumericRange, rule: { min: 2020, max: 2030 } }
      ]
    },
    {
      name: 'hgt', required: true, dataValidators: [
        { type: ValidatorType.Custom, rule: CustomValidators.HeightValidator }
      ]
    },
    {
      name: 'hcl', required: true, dataValidators: [
        { type: ValidatorType.Regex, rule: '^#(?:[0-9a-fA-F]{3}){1,2}$' }
      ]
    },
    {
      name: 'ecl', required: true, dataValidators: [
        { type: ValidatorType.LookupList, rule: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'] }
      ]
    },
    {
      name: 'pid', required: true, dataValidators: [
        { type: ValidatorType.Regex, rule: '^\\d{9}$' }
      ]
    },
    { name: 'cid', required: false }
  ]

  const passportDataList = passportUtils.getPassportDataListFromBatch(input)

  let validPassportsInBatch = 0

  for (let passportData of passportDataList) {
    const isPassportValid = passportUtils.isPassportValid(passportData, validators)

    if (isPassportValid) {
      validPassportsInBatch++
    }
  }

  return validPassportsInBatch
}

module.exports = { solve }
