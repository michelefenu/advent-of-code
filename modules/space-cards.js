const runSimulation = (deck1, deck2) => {
  while (deck1.length && deck2.length) {
    const player1card = deck1.shift()
    const player2card = deck2.shift()

    if (player1card > player2card) {
      deck1 = [...deck1, player1card, player2card]
    } else {
      deck2 = [...deck2, player2card, player1card]
    }
  }

  // Calculate score
  const winnerDeck = deck1.length ? deck1 : deck2
  return winnerDeck.reverse().reduce((acc, val, index) => acc + val * (index + 1), 0)
}

const runRecursiveSimulation = (deck1, deck2) => {
  const previousHands = new Set()
  
  while (deck1.length && deck2.length) {

    const state = `${deck1.join(',')}#${deck2.join(',')}`
    if (previousHands.has(state)) {
      deck2 = []
      break
    } else {
      previousHands.add(state)
    }

    const player1card = deck1.shift()
    const player2card = deck2.shift()
    let player1wins = false

    if (player1card <= deck1.length && player2card <= deck2.length) {
      player1wins = playRoundRecursive(deck1.slice(0, player1card), deck2.slice(0, player2card))
    } else if (player1card > player2card) {
      player1wins = true
    }

    if (player1wins) {
      deck1 = [...deck1, player1card, player2card]
    } else {
      deck2 = [...deck2, player2card, player1card]
    }
  }


  // Calculate score
  const winnerDeck = deck1.length ? deck1 : deck2
  return winnerDeck.reverse().reduce((acc, val, index) => acc + val * (index + 1), 0)
}

function playRoundRecursive(deck1, deck2) {
  const previousHands = new Set()
  while (deck1.length && deck2.length) {

    if (previousHands.has(`${deck1.join(',')}#${deck2.join(',')}`)) {
      deck2 = []
      break
    } else {
      previousHands.add(`${deck1.join(',')}#${deck2.join(',')}`)
    }

    const player1card = deck1.shift()
    const player2card = deck2.shift()

    let player1wins = false

    if (player1card <= deck1.length && player2card <= deck2.length) {
      player1wins = playRoundRecursive(deck1.slice(0, player1card), deck2.slice(0, player2card))
    } else if (player1card > player2card) {
      player1wins = true
    }

    if (player1wins) {
      deck1 = [...deck1, player1card, player2card]
    } else {
      deck2 = [...deck2, player2card, player1card]
    }
  }

  return !deck2.length
}


module.exports = {
  runSimulation,
  runRecursiveSimulation
}
