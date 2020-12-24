/**
 * 
 * @param {number[]} cups 
 * @param {number} moves 
 */
const runSimulation = (cups, moves) => {
  const cupStack = new CircularLinkedList()
  const maxValue = cups.length

  for (let cup of cups) {
    cupStack.append(cup)
  }

  while (moves--) {
    const pickedUpCups = [cupStack.removeAt(1), cupStack.removeAt(1), cupStack.removeAt(1)]

    let destination = cupStack.getHead().element > 1 ? cupStack.getHead().element - 1 : maxValue

    while (!cupStack.isPresent(destination)) {
      destination = destination > 1 ? destination - 1 : maxValue
    }

    const destinationIndex = cupStack.indexOf(destination)

    cupStack.insert(pickedUpCups[2], destinationIndex + 1)
    cupStack.insert(pickedUpCups[1], destinationIndex + 1)
    cupStack.insert(pickedUpCups[0], destinationIndex + 1)

    cupStack.setHead(cupStack.getHead().next)
  }

  cupStack.setHead(cupStack.getElementAt(cupStack.indexOf(1)))

  return cupStack.toString().replace(/->/g, '').replace('1', '')
}

/**
 * 
 * @param {number[]} cups 
 * @param {number} moves 
 */
const runExtremeSimulation = (cups, moves) => {
  /* const MAX_VALUE = 1000000
  let cupStack = [...Array(MAX_VALUE).keys()].slice(cups.length + 1)
  cupStack =[...cups, ...cupStack] */

  let cupStack = cups
  const MAX_VALUE = cups.length

  let currentCup = cups[0]

  while (moves--) {
    console.log('---', 10 - moves, '---')
    console.log(cupStack)
    let currentCupIndex = cupStack.indexOf(currentCup)
    const pickedUpCups = []
    pickedUpCups.push(...cupStack.splice(currentCupIndex + 1 < cupStack.length ? currentCupIndex + 1 : 0, 1))
    currentCupIndex = cupStack.indexOf(currentCup)
    pickedUpCups.push(...cupStack.splice(currentCupIndex + 1 < cupStack.length ? currentCupIndex + 1 : 0, 1))
    currentCupIndex = cupStack.indexOf(currentCup)
    pickedUpCups.push(...cupStack.splice(currentCupIndex + 1 < cupStack.length ? currentCupIndex + 1 : 0, 1))
    currentCupIndex = cupStack.indexOf(currentCup)

    console.log(pickedUpCups)

    let destination = cupStack[currentCupIndex] > 1 ? cupStack[currentCupIndex] - 1 : MAX_VALUE

    while (destination === currentCup || cupStack.indexOf(destination) === -1) {
      destination = destination > 1 ? destination - 1 : MAX_VALUE
    }

    console.log(destination)


    let destinationIndex = cupStack.indexOf(destination)

    let before = [...cupStack.slice(0, destinationIndex + 1)]
    let after = [...cupStack.slice(destinationIndex + 1)]
    cupStack = [...before, ...pickedUpCups, ...after]

    currentCupIndex = cupStack.indexOf(currentCup)
    currentCup = cupStack[currentCupIndex + 1 < cupStack.length ? currentCupIndex + 1 : 0]
  }

  const headIndex = cupStack.indexOf(1)
  const n = cupStack.length
  console.log(cupStack[(headIndex + 1 % n + n) % n], cupStack[(headIndex + 2 % n + n) % n])
}

class CircularLinkedList {
  #length
  #head

  constructor() {
    this.head = null
    this.length = 0
  }

  append(element) {
    const node = new Node(element)
    let current

    if (this.head === null) {
      this.head = node
    } else {
      current = this.getElementAt(this.length - 1)
      current.next = node
    }

    node.next = this.head

    this.length++
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.length) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  insert(element, index) {
    if (index >= 0 && index <= this.length) {
      const node = new Node(element);
      let current = this.head;

      if (index === 0) {
        if (this.head === null) {
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          current = this.getElementAt(this.length)
          this.head = node
          current.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }

      this.length++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.length) {
      let current = this.head

      if (index === 0) {
        if (this.length === 1) {
          this.head = undefined
        } else {
          const removed = head
          current = this.getElementAt(this.length - 1)
          this.head = this.head.next
          current.next = this.head
          current = removed
        }
      } else {
        //Remove at given index (middle or end)
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }

      this.length--
      return current.element
    }
    return undefined
  }

  indexOf(elm) {
    let current = this.head
    let index = -1

    const temp = this.head.element

    while (current) {
      if (elm === current.element) {
        return ++index
      }

      if (temp === current.next.element) {
        return -1
      }

      index++
      current = current.next
    }

    return -1
  }

  isPresent(elm) {
    return this.indexOf(elm) !== -1
  }

  getHead() {
    return this.head
  }

  setHead(head) {
    this.head = head
  }

  toString() {
    let current = this.head
    let out = ''

    //Keep track of the head
    const temp = this.head.element

    while (current) {
      //If head is the next element then break
      if (temp === current.next.element) {
        out += current.element
        break
      }

      out += `${current.element}->`
      current = current.next
    }

    return out;
  }
}

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}


module.exports = {
  runSimulation,
  runExtremeSimulation
}