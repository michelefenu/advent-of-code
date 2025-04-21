const hydrothermalUtils = require('../../modules/hydrothermal-utils');

function solve(input) {
  return hydrothermalUtils.getHydrothermalSourcesMap(input);
}

module.exports = { solve }