const calculate = (expression) => {

  const tokens = expression
    .replace(/\s/g, '')
    .split('')

  return calculateRecursive(tokens, 0)
}

const calculateNewRules = (expression) => {
  /**
   * 
    https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods

    The Fortran I compiler would expand each operator with a sequence of parentheses. In a simplified form of the algorithm, it would

        replace + and – with ))+(( and ))-((, respectively;
        replace * and / with )*( and )/(, respectively;
        add (( at the beginning of each expression and after each left parenthesis in the original expression; and
        add )) at the end of the expression and before each right parenthesis in the original expression.

    Although not obvious, the algorithm was correct, and, in the words of Knuth, “The resulting formula is properly parenthesized, believe it or not.”[8]

   */
  return eval('((' + expression
    .replace(/\(/g, '(((')
    .replace(/\)/g, ')))')
    .replace(/\+/g, ')+(')     // <--  exchange parethesis to invert priorities
    .replace(/\*/g, '))*((')   // <--
    + '))')
}

function calculateRecursive(expression, initialValue) {
  let currentOp
  let result = initialValue

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i]
    switch (token) {
      case ')':
        return result
      case '(':
        const matchingBracketIndex = findMatchingBracket(expression, i + 1)
        const subExpression = expression.slice(i + 1, matchingBracketIndex)
        if (currentOp === '+') {
          result += calculateRecursive(subExpression, 0)
        } else if (currentOp === '*') {
          result *= calculateRecursive(subExpression, 0)
        } else {
          result = calculateRecursive(subExpression, 0)
        }
        i = matchingBracketIndex
        break
      case '+':
        currentOp = '+'
        break
      case '*':
        currentOp = '*'
        break
      default:
        if (currentOp === '+') {
          result += parseInt(token)
        } else if (currentOp === '*') {
          result *= parseInt(token)
        } else {
          result = parseInt(token)
        }

    }
  }

  return result
}

function findMatchingBracket(expression, startIndex) {
  let bracketCount = 1

  for (let i = startIndex; i < expression.length; i++) {
    const token = expression[i]
    if (token === ')') {
      bracketCount--
      if (!bracketCount) {
        return i
      }
    } else if (token === '(') {
      bracketCount++
    }
  }
}

module.exports = {
  calculate,
  calculateNewRules
}
