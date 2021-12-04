const manageLights = function (instructions) {
  let map = new Array(1000).fill(false).map(() => new Array(1000).fill(false));

  for (let instruction of instructions) {
    map = execute(map, instruction);
  }

  return map.flat().filter(Boolean).length;
};

const execute = function (map, instruction) {
  const regex = /(turn on|turn off|toggle) (\d+,\d+) through (\d+,\d+)/;
  const op = instruction.match(regex)[1];
  const startPos = instruction.match(regex)[2].split(",").map(Number);
  const endPos = instruction.match(regex)[3].split(",").map(Number);

  for (let i = startPos[0]; i <= endPos[0]; i++) {
    for (let j = startPos[1]; j <= endPos[1]; j++) {
      switch (op) {
        case "turn on":
          map[i][j] = true;
          break;
        case "turn off":
          map[i][j] = false;
          break;
        case "toggle":
          map[i][j] = !map[i][j];
          break;
      }
    }
  }

  return map;
};

const manageBrightness = function (instructions) {
  let map = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

  for (let instruction of instructions) {
    map = executeBright(map, instruction);
  }

  return map.flat().reduce((acc, val) => acc + val, 0);
};

const executeBright = function (map, instruction) {
  const regex = /(turn on|turn off|toggle) (\d+,\d+) through (\d+,\d+)/;
  const op = instruction.match(regex)[1];
  const startPos = instruction.match(regex)[2].split(",").map(Number);
  const endPos = instruction.match(regex)[3].split(",").map(Number);

  for (let i = startPos[0]; i <= endPos[0]; i++) {
    for (let j = startPos[1]; j <= endPos[1]; j++) {
      switch (op) {
        case "turn on":
          map[i][j] += 1;
          break;
        case "turn off":
          map[i][j] = map[i][j] > 0 ? map[i][j] - 1 : 0;
          break;
        case "toggle":
            map[i][j] += 2;
          break;
      }
    }
  }

  return map;
};

module.exports = {
  manageLights,
  manageBrightness,
};
