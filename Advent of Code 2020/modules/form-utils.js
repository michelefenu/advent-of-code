/**
 * @param {string[]} forms the form responses for all groups
 */
const getTotalYesAnswers = (forms) => {
  const totalYesAnswers = forms
    .map(x => !x ? '§' : x)
    .join('')
    .split('§')
    .map(x => new Set(x.split('')))
    .reduce((acc, x) => x.size + acc, 0)

  return totalYesAnswers
}

/**
 * @param {string[]} forms the form responses for all groups
 */
const getTotalCommonYesAnswers = (forms) => {


  const answersForGroup = forms
    .map(x => !x ? '§' : `${x}$`)
    .join('')
    .split('§')
    .map(x => x.split('$').filter(x => !!x))
  
  // [
  //  [ 'abc' ],
  //  [ 'a', 'b', 'c' ],
  //  [ 'ab', 'ac' ],
  //  [ 'a', 'a', 'a', 'a' ],
  //  [ 'b' ]
  // ]
  const totalYesAnswers = answersForGroup
    .map(x => x.map(x => new Set(x.split(''))))
    .map(x => x.reduce((acc, x) => new Set([...x].filter(x => acc.has(x)))))
    .reduce((acc, x) => x.size + acc, 0)

  return totalYesAnswers
}


module.exports = {
  getTotalYesAnswers,
  getTotalCommonYesAnswers
}