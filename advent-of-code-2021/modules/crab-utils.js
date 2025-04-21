const calculateFuel = (data) => {
  const crabPositions = data
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);

  const medianValue = crabPositions[crabPositions.length / 2];

  return crabPositions.reduce(
    (acc, val) => acc + Math.abs(val - medianValue),
    0
  );
};

const calculateFuelImproved = (data) => {
  let crabPositions = data.split(",").map(Number);

  const meanValue = Math.floor(
    crabPositions.reduce((acc, val) => acc + val, 0) / crabPositions.length
  );

  return crabPositions.reduce((acc, val) => {
    const distance = Math.abs(val - meanValue);
    const consumption = (distance * (distance + 1)) / 2;

    return acc + consumption;
  }, 0);
};

module.exports = {
  calculateFuel,
  calculateFuelImproved,
};
