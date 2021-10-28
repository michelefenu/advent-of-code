const ticketUtils = require('../../modules/ticket-utils')

function solve(input) {
  const rules = getRules(input)
  const myTicket = getMyTicket(input)
  const nearbyTickets = getNearbyTickets(input)

 return ticketUtils.getTicketErrorRate(rules, myTicket, nearbyTickets)
}

function getRules(input) {
  return input
    .slice(0, input.indexOf('your ticket:') -1)
    .map(x => ({
      name: x.split(':')[0],
      rule: x.split(': ')[1].split(' or ').map(range => range.split('-').map(n => parseInt(n)))
    }))
}

function getMyTicket(input) {
  return input[input.indexOf('your ticket:') + 1]
    .split(',')
    .map(x => parseInt(x))
}

function getNearbyTickets(input) {
  return input
    .slice(input.indexOf('nearby tickets:') + 1)
    .map(x => x.split(',').map(x => parseInt(x)))
}

module.exports = { solve }
