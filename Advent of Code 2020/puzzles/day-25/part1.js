function solve(input) {
  const cardPublicKey = parseInt(input[0])
  const doorPublicKey = parseInt(input[1])

  const cardLoopSize = getLoopSize(cardPublicKey, 7)
  const doorLoopSize = getLoopSize(doorPublicKey, 7)

  return getEncryptionKey(cardLoopSize, doorPublicKey)
}


function getEncryptionKey(cardLoopSize, doorPublicKey) {
  let value = 1
  for (let i = 0; i < cardLoopSize; i++) {
    value = value * doorPublicKey
    value = value % 20201227
  }
  return value
}

function getLoopSize(key, subject) {
  let value = 1
  let loopSize = 0

  do {
    loopSize++
    value = value * subject
    value = value % 20201227
  } while (value !== key)

  return loopSize
}

module.exports = { solve }
