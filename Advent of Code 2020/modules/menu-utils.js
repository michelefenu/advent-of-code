
const getSafeFoodsNumber = (menu) => {
  const allergensList = new Map()

  for(let dish of menu) {
    for(let allergen of dish.allergens) {
      const previousIngredients = allergensList.get(allergen)
      let matchingIngredients
      if(previousIngredients) {
        matchingIngredients = new Set([...dish.ingredients].filter(x => previousIngredients.has(x)));
      } else {
        matchingIngredients = new Set(dish.ingredients)
      }
      allergensList.set(allergen, matchingIngredients)
    }
  }

  const allIngredients = menu.map(x => x.ingredients).flat()
  const matchingIngredients = [...new Set([...allergensList.values()].reduce((a, b) => [...a, ...b], []))]
  const safeIngredients = allIngredients.filter(x => !matchingIngredients.includes(x))
  
  return safeIngredients.length
}

const getCanonicalDangerousIngredientList = (menu) => {
  const allergensList = new Map()

  for(let dish of menu) {
    for(let allergen of dish.allergens) {
      const previousIngredients = allergensList.get(allergen)
      let matchingIngredients
      if(previousIngredients) {
        matchingIngredients = new Set([...dish.ingredients].filter(x => previousIngredients.has(x)))
      } else {
        matchingIngredients = new Set(dish.ingredients)
      }
      allergensList.set(allergen, matchingIngredients)
    }
  }

  const canonicalList = Array.from(allergensList, ([allergen, ingredients]) => ({ allergen, ingredients }));
  let needWork
  do {
    needWork = false
    const confirmedAllergens = canonicalList
      .filter(x => x.ingredients.size === 1)
      .map(x => [...x.ingredients][0])

    for(let allergen of canonicalList) {
      if(allergen.ingredients.size > 1) {
        allergen.ingredients = new Set([...allergen.ingredients].filter(x => !confirmedAllergens.includes(x)));
        needWork = true
      }
    }
  } while(needWork)

  return canonicalList.sort((a,b) => a.allergen.localeCompare(b.allergen)).map(x => [...x.ingredients][0]).join(',')

}


module.exports = {
  getSafeFoodsNumber,
  getCanonicalDangerousIngredientList
}