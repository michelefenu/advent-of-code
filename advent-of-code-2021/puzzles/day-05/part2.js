const hydrothermalUtils = require('../../modules/hydrothermal-utils');

function solve(input) {
  return hydrothermalUtils.getHydrothermalSourcesMap(input, false);
}

module.exports = { solve }