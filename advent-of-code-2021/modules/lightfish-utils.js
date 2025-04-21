const simulate = (initialState, days) => {
  let state = [...initialState.split(",").map(Number)];

  for (let i = 0; i < days; i++) {
    let newBorneFishes = 0;
    state = state.map((x) => {
      if (x === 0) {
        x = 6;
        newBorneFishes = newBorneFishes + 1;
      } else {
        x = x - 1;
      }
      return x;
    });

    if (newBorneFishes) {
      state = [...state, ...Array(newBorneFishes).fill(8)];
    }
  }

  return state.length;
};

const estimate = (initialState, days) => {
  initialState = initialState.split(",").map(Number);

  let state = Array(9).fill(0);
  for (let fish of initialState) {
    state[fish] = state[fish] + 1;
  }

  for (let i = 0; i < days; i++) {
    let newBorneFishes = state[0];
    for (let fishIndex = 1; fishIndex < state.length; fishIndex++) {
      state[fishIndex - 1] = state[fishIndex];
      state[fishIndex] = 0;
    }

    state[8] = newBorneFishes;
    state[6] = state[6] + newBorneFishes;
  }

  return state.reduce((acc, val) => acc + val, 0);
};

module.exports = {
  simulate,
  estimate,
};
