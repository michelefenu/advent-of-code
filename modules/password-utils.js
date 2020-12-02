
/**
 * 
 * @param {string} password 
 * @param {string} rule 
 */
const isPasswordValidLegacy = (password, rule) => {
  const character = rule.split(' ')[1]
  const minOccurrences = rule.split(' ')[0].split('-')[0]
  const maxOccurences = rule.split(' ')[0].split('-')[1]

  const matchingRegex = new RegExp(character, 'g')
  const occurrences = password.match(matchingRegex)?.length || 0
  
  return minOccurrences <= occurrences && maxOccurences >= occurrences
}

/**
 * 
 * @param {string} password 
 * @param {string} rule 
 */
const isPasswordValid = (password, rule) => {
  const character = rule.split(' ')[1]
  const index1 = rule.split(' ')[0].split('-')[0] - 1
  const index2 = rule.split(' ')[0].split('-')[1] - 1

  const char1 = password.charAt(index1)
  const char2 = password.charAt(index2)
  
  return (character === char1 || character === char2) && char1 !== char2
}

module.exports = {
  isPasswordValidLegacy, 
  isPasswordValid
}