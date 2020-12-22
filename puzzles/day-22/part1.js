const spaceCards = require('../../modules/space-cards.js')

function solve(input) {
  const deck1 = input.join('$')
    .split('$$Player 2')[0]
    .replace('Player 1:$', '')
    .split('$')
    .map(x => parseInt(x))

  const deck2 = input.join('$')
    .split('$$Player 2:$')[1]
    .split('$')
    .map(x => parseInt(x))

  return spaceCards.runSimulation(deck1, deck2)
}

module.exports = { solve }
