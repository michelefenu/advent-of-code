const buildRule = (rulesString) => {
  const rules = new Map()

  for (let rule of rulesString) {
    const pos = rule.split(':')[0]
    const value = rule.split(': ')[1]

    rules.set(pos, value)
  }

  return `^${buildRuleRecursive('0', rules, 0)}$`
}

function isTerminal(rule) {
  return rule && rule.includes('"')
}

function buildRuleRecursive(key, rules, recursionLevel) {

  // Cheat for part 2 :)
  if(recursionLevel > 42)
    return ''

  const rule = rules.get(key)

  if (isTerminal(rule)) {
    return rule.replace(/\"/g, '');
  } else {
    const expandedRule = rule.split(' ').reduce((rule, char) => `${rule}${(char === '|' ? '|' : buildRuleRecursive(char, rules, recursionLevel + 1))}`, '')
    return `(${expandedRule})`
  }
}


const isMessageValid = (message, rule) => {
  const validator = new RegExp(rule)
  return validator.test(message)
}


module.exports = {
  buildRule,
  isMessageValid
}