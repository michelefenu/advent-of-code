const ValidatorType = {
  MinLength: 'minlength',
  NumericRange: 'numericrange',
  Regex: 'regex',
  LookupList: 'lookuplist',
  Custom: 'custom'
}

const CustomValidators = {
  HeightValidator: heightValidator
}

function heightValidator(data) {
  const pattern = new RegExp('^(\\d+)(cm|in)$')
  const isFormatValid = pattern.test(data)
  if (!isFormatValid) {
    return false
  }

  const height = data.match(pattern)[1]
  const unit = data.match(pattern)[2]

  if (unit === 'cm') {
    return height >= 150 && height <= 193
  } else if (unit === 'in') {
    return height >= 59 && height <= 76
  }

  return false
}

/**
 * 
 * @param {string} passportData 
 * @param {string[]} validators 
 */
const validatePassportFieldNames = (passportData, validators) => {
  const passportFields = passportData
    .split(' ')
    .map(passportField => passportField.split(':')[0])

  const notMatchingValidators = validators
    .filter(x => passportFields.indexOf(x.name) === -1)

  return notMatchingValidators
}

const isPassportValid = (passportData, validators) => {
  const notMatchingValidators = validatePassportFieldNames(passportData, validators)
  const validationErrors = notMatchingValidators.filter(x => x.required).length
  
  if (validationErrors) {
    return false
  }

  const passportFields = passportData.split(' ')

  for (let passportField of passportFields) {
    const fieldName = passportField.split(':')[0]
    const fieldValue = passportField.split(':')[1]
    const fieldValidator = validators.filter(validator => validator.name === fieldName)[0]

    if (fieldValidator) {
      for (let dataValidator of fieldValidator.dataValidators || []) {
        if (!validateData(fieldValue, dataValidator)) {
          return false
        }
      }
    }
  }
  return true
}

/**
 * Returns an array of passport data, removing blank lines
 * and putting all passport data on a single array entry
 * @param {string[]} rawInput 
 */
const getPassportDataListFromBatch = function (rawInput) {
  const passportDataList = rawInput
    .map(x => !x ? '§' : x)
    .join(' ')
    .split('§')
    .map(x => x.trim())

  return passportDataList
}

/**
 * Validator Format
 * 
 * MinLength: {type: ValidatorType.MinLengt, rule: 4}
 * NumericRange: {type: ValidatorType.NumericRange, rule: {min: 1, max: 5}}
 * Regex: {type: ValidatorType.Regex, rule: '[a-z][A-Z]'}
 * Custom: {type: ValidatorType.Custom, rule: function}
 * LookupList: {type: ValidatorType.LookupList, rule: ['a', 'b', ...]}
 * @param {string} data the string to be validated
 * @param {*} validator 
 */
const validateData = function (data, validator) {
  switch (validator.type) {
    case ValidatorType.MinLength:
      return data.length === +validator.rule
    case ValidatorType.NumericRange:
      return validator.rule.min <= +data && validator.rule.max >= +data
    case ValidatorType.Regex:
      const pattern = new RegExp(validator.rule)
      return pattern.test(data)
    case ValidatorType.Custom:
      return validator.rule(data)
    case ValidatorType.LookupList:
      return validator.rule.indexOf(data) !== -1
    default:
      console.warn('Validator not found')
      return false;
  }
}

module.exports = {
  validatePassportFieldNames,
  isPassportValid,
  getPassportDataListFromBatch,
  ValidatorType,
  CustomValidators
}