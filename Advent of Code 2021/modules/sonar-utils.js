const countIncreased = function (measurements) {
  let count = 0;

  for (let i = 1; i < measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
      count++;
    }
  }

  return count;
};

const countSlidingIncreased = function (measurements) {
  let count = 0;

  for (let i = 3; i < measurements.length; i++) {
    const current = measurements[i] + measurements[i - 1] + measurements[i - 2];
    const previous =
      measurements[i - 1] + measurements[i - 2] + measurements[i - 3];

    if (current > previous) {
      count++;
    }
  }

  return count;
};

module.exports = {
  countIncreased,
  countSlidingIncreased,
};
