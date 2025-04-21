const getNumber = (startingNumbers, n) => {
  let numbers = new Array(n)
  numbers = [...startingNumbers, numbers]

  for (let i = startingNumbers.length; i < n; i++) {
    const lastNumber = numbers[i - 1]
    const lastIndex = numbers.lastIndexOf(lastNumber, i - 2)

    if (lastIndex !== -1) {
      numbers[i] = (i) - (lastIndex + 1)
    } else[
      numbers[i] = 0
    ]

    if (i % 10000 === 0)
      console.log(i + '/' + n)
  }
  return numbers[n - 1]
}

const getNumberImproved = (startingNumbers, n) => {
  let numbers = new Map()

  for(const [index, value] of startingNumbers.entries()) {
    numbers.set(value, index + 1)
  }

  const last = startingNumbers[startingNumbers.length - 1]

  numbers.set('last', {value: last, index: startingNumbers.length})
  numbers.delete(last)

  for (let i = startingNumbers.length; i < n; i++) {
    const lastNumber = numbers.get('last')

    const previousOccurrencePosition = numbers.get(lastNumber.value)
    let currentValue = 0
    if(previousOccurrencePosition) {
      currentValue = i - previousOccurrencePosition
    }

    numbers.set('last', {value: currentValue, index: i+1})
    numbers.set(lastNumber.value, lastNumber.index)
  }
  return numbers.get('last').value
}

module.exports = {
  getNumber,
  getNumberImproved
}