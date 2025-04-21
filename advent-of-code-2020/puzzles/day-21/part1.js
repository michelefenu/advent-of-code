const menuUtils = require('../../modules/menu-utils')

function solve(input) {
  const menu = input.map(x => ({ 
    ingredients: x.split(' (contains ')[0].split(' '),
    allergens: x.split(' (contains ')[1].split(')')[0].split(', ')
  }))

  return menuUtils.getSafeFoodsNumber(menu)
}

module.exports = { solve }
