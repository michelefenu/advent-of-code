const getSubmarineData = function (diagnosticData) {
  const dataRowLength = diagnosticData[0].length;
  const totalDiagnosticRows = diagnosticData.length;

  let onesOccurrenceCount = new Array(dataRowLength).fill(0);

  for (let diagnosticRow of diagnosticData) {
    let data = diagnosticRow.split("").map(Number);
    onesOccurrenceCount = onesOccurrenceCount.map((v, i) => v + data[i]);
  }

  const zeroesOccurrenceCount = onesOccurrenceCount.map(
    (v) => totalDiagnosticRows - v
  );

  const gammaRate = onesOccurrenceCount
    .map((v, i) => (v >= zeroesOccurrenceCount[i] ? 1 : 0))
    .join("");

  const epsilonRate = zeroesOccurrenceCount
    .map((v, i) => (v > onesOccurrenceCount[i] ? 1 : 0))
    .join("");

  return { gammaRate, epsilonRate };
};

const getLifeSupportRating = function (diagnosticData) {
  let bitPosition = 0;

  let oxygenGeneratorRating = [...diagnosticData];
  let co2ScrubbingRating = [...diagnosticData];

  while (oxygenGeneratorRating.length > 1) {
    let { gammaRate } = getSubmarineData(oxygenGeneratorRating);
    gammaRate = gammaRate.split("");

    oxygenGeneratorRating = oxygenGeneratorRating.filter(
      (v) => v.charAt(bitPosition) === gammaRate[bitPosition]
    );

    bitPosition++;
  }

  bitPosition = 0;
  while (co2ScrubbingRating.length > 1) {
    let { epsilonRate } = getSubmarineData(co2ScrubbingRating);
    epsilonRate = epsilonRate.split("");

    co2ScrubbingRating = co2ScrubbingRating.filter(
      (v) => v.charAt(bitPosition) === epsilonRate[bitPosition]
    );

    bitPosition++;
  }

  return parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2ScrubbingRating[0], 2);
};

module.exports = {
  getSubmarineData,
  getLifeSupportRating,
};
