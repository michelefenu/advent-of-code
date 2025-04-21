/**
 * 
 * @param {string[]} luggageRules
 */
const getLuggagesMap = (luggageRules) => {
  const luggageFlatMap = luggageRules.map(luggageRule => {
    const color = luggageRule.split('bags contain')[0].trim()
    const ruleDetail = luggageRule
      .split('bags contain')[1]
      .split(',')
      .map(x => x.trim().replace('.', ''))

    const luggageMap = ruleDetail.map(x => {
      const matchingGroups = x.match(/^(\d+)\s(.+)\sbags*$/)
      const qty = matchingGroups ? +matchingGroups[1] : 0
      const color = matchingGroups ? matchingGroups[2] : null

      return qty ? { qty, color } : null
    })

    return { color, content: luggageMap[0] ? luggageMap : null }
  })

  const luggageMap = luggageFlatMap.map(rule => {
    for (let luggage of rule.content || []) {
      luggage.content = luggageFlatMap.find(x => x.color === luggage.color)?.content
    }
    return rule
  })

  return luggageMap
}


const findWrappingBag = (luggageMap, targetColor) => {
  const wrappingBags = luggageMap.map(luggage => {
    return {
      color: luggage.color,
      valid: findWrappingBagRecursive(luggage, targetColor, false)
    }
  })

  return wrappingBags
}

const getNumberOfContainedBags = (luggageMap, targetColor) => {
  const targetColorMap = luggageMap.find(x => x.color === targetColor)
  const numberOfContainedBags = countContainedBags(targetColorMap.content)

  return numberOfContainedBags
}

function countContainedBags(currentColorMapContent) {
  let contained = 0
  for(let suitcase of currentColorMapContent) {
    if(suitcase.content) {
      contained += suitcase.qty + suitcase.qty * countContainedBags(suitcase.content)
    } else {
      contained += suitcase.qty
    }
  }
  return contained
}

/**
 * 
 * @param {*} luggagesMap the rules three
 * @param {*} targetColor my bag's color
 */
function findWrappingBagRecursive(luggage, targetColor) {
  if (luggage.color === targetColor) {
    return true
  }
  let valid = false;

  for (let suitcase of luggage.content || []) {
    valid = valid || findWrappingBagRecursive(suitcase, targetColor)
  }
  return valid
}

module.exports = {
  getLuggagesMap,
  findWrappingBag,
  getNumberOfContainedBags
}
