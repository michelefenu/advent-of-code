const passwordUtils = require('../../modules/password-utils')

function solve(input) {
  let validPasswords = 0;

  for(let line of input) {
    const rule = line.split(':')[0]
    const password = line.split(':')[1].trim()

    if(passwordUtils.isPasswordValidLegacy(password, rule)) {
      validPasswords = validPasswords + 1
    }
  }

  return validPasswords
}

module.exports = { solve }
