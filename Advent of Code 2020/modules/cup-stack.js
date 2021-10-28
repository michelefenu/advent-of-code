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
  const cupStack = new CircularLinkedList()

  for (let cup of cups) {
    cupStack.append(cup)
  }

  cupStack.fillUntil(1000000)
  const maxValue = cupStack.length
  
  while (moves--) {
    const pickedUpCups = [cupStack.removeAfterHead(), cupStack.removeAfterHead(), cupStack.removeAfterHead()]

    let destination = cupStack.getHead().element > 1 ? cupStack.getHead().element - 1 : maxValue

    while (!cupStack.isPresentBySearch(destination)) {
      destination = destination > 1 ? destination - 1 : maxValue
    }

    cupStack.insertAfter(destination, pickedUpCups[2].element)
    cupStack.insertAfter(destination, pickedUpCups[1].element)
    cupStack.insertAfter(destination, pickedUpCups[0].element)

    cupStack.setHead(cupStack.getHead().next)
  }

  return cupStack.getElementByValue(1).next.element * cupStack.getElementByValue(1).next.next.element
}

class CircularLinkedList {
  length
  #head
  #searchByValue

  constructor() {
    this.#head = null
    this.length = 0
    this.#searchByValue = []
  }

  append(element) {
    const node = new Node(element)
    let current

    if (this.#head === null) {
      this.#head = node
    } else {
      current = this.getElementAt(this.length - 1)
      current.next = node
    }

    node.next = this.#head

    this.#searchByValue[element] = node
    this.length++
  }

  /**
   * 
   * @param {number} max fill the list until max is reached
   */
  fillUntil(max) {
    let tail = this.getElementAt(this.length - 1)

    for (let i = this.length + 1; i <= max; i++) {
      let current = new Node(i)
      tail.next = current
      tail = current
      this.length++
      this.#searchByValue[i] = tail

    }
    tail.next = this.#head
    this.#searchByValue[tail.element] = tail
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.length) {
      let node = this.#head
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
      let current = this.#head;

      if (index === 0) {
        if (this.#head === null) {
          this.#head = node
          node.next = this.#head
        } else {
          node.next = current
          current = this.getElementAt(this.length)
          this.#head = node
          current.next = this.#head
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

  /**
   * Inserts a new node after an element
   * @param {} element 
   * @param {*} nodeValue 
   */
  insertAfter(element, nodeValue) {
    const elementNode = this.getElementByValue(element)
    const node = new Node(nodeValue)

    node.next = elementNode.next
    elementNode.next = node 

    this.#searchByValue[nodeValue] = node
  }

  removeAt(index) {
    if (index >= 0 && index < this.length) {
      let current = this.#head

      if (index === 0) {
        if (this.length === 1) {
          this.#head = undefined
        } else {
          const removed = head
          current = this.getElementAt(this.length - 1)
          this.#head = this.#head.next
          current.next = this.#head
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

  removeAfterHead() {
    let node = this.#head.next
    this.#head.next = node.next
    this.#searchByValue[node.element] = null
    return node
  }

  getElementByValue(elm) {
    return !!this.#searchByValue[elm] ? this.#searchByValue[elm] : -1
  }

  indexOf(elm) {
    let current = this.#head
    let index = -1

    const temp = this.#head.element

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

  isPresentBySearch(elm) {
    return !!this.#searchByValue[elm]
  }

  getHead() {
    return this.#head
  }

  setHead(head) {
    this.#head = head
  }

  toString() {
    let current = this.#head
    let out = ''

    //Keep track of the head
    const temp = this.#head.element

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