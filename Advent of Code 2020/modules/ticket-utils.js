const getTicketErrorRate = (rules, myTicket, nearbyTickets) => {
  let invalidValues = []

  for (let value of myTicket) {
    const isValueValid = checkRules(value, rules)
    if (!isValueValid) {
      invalidValues.push(value)
    }
  }

  for (let ticket of nearbyTickets) {
    for (let value of ticket) {
      const isValueValid = checkRules(value, rules)
      if (!isValueValid) {
        invalidValues.push(value)
      }
    }
  }
  return invalidValues.reduce((acc, value) => value + acc, 0)
}

const buildTicket = (rules, myTicket, nearbyTickets) => {

  nearbyTickets = getNearbyValidTickets(rules, [...nearbyTickets, myTicket])
  const ticketMatchings = []
  for (const [index, rule] of rules.entries()) {
    ticketMatchings[index] = { name: rule.name, values: [] }
    for (let i = 0; i < nearbyTickets[0].length; i++) {
      const values = nearbyTickets.map(x => x[i])
      if (checkRuleForValues(values, rule)) {
        ticketMatchings[index].values.push(myTicket[i])
      }
    }
  }

  ticketMatchings.sort((a, b) => a.values.length - b.values.length)

  for (const [index, field] of ticketMatchings.entries()) {
    const currentFieldValues = field.values
    for (let i = index + 1; i < ticketMatchings.length; i++) {
      ticketMatchings[i].values = ticketMatchings[i].values.filter(x => currentFieldValues.indexOf(x) === -1)
    }
  }

  return ticketMatchings
    .filter(x => x.name.includes('departure'))
    .reduce((acc, val) => acc * val.values[0], 1)
}

const getNearbyValidTickets = (rules, nearbyTickets) => {

  for (const [index, ticket] of nearbyTickets.entries()) {
    for (let value of ticket) {
      const isValueValid = checkRules(value, rules)
      if (!isValueValid) {
        nearbyTickets[index] = { invalid: true }
        break
      }
    }
  }

  return nearbyTickets.filter(x => !x.invalid)
}

/**
 *  { name: 'class', rule: [ [1,3], [5-7] ] },
 *  { name: 'row', rule: [ [6-11], [33-34] ] },
 *  { name: 'seat', rule: [ [13-40], [45-50] ] }
 * @param {*} value 
 * @param {*} rules 
 */
const checkRules = function (value, rules) {
  for (let rule of rules) {
    const range1 = rule.rule[0]
    const range2 = rule.rule[1]

    const isInRange1 = value >= range1[0] && value <= range1[1]
    const isInRange2 = value >= range2[0] && value <= range2[1]

    if (isInRange1 || isInRange2) {
      return true
    }
  }

  return false
}

/**
 * @param {*} values an array of values
 * @param {*} rule a rule
 */
const checkRuleForValues = function (values, rule) {
  for (let value of values) {
    const range1 = rule.rule[0]
    const range2 = rule.rule[1]

    const isInRange1 = value >= range1[0] && value <= range1[1]
    const isInRange2 = value >= range2[0] && value <= range2[1]

    if (!isInRange1 && !isInRange2) {
      return false
    }
  }
  return true
}

module.exports = {
  getTicketErrorRate,
  buildTicket
}
