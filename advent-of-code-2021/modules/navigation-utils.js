const navigate = function (directions) {
  const position = { x: 0, y: 0 };

  for (let direction of directions) {
    const operation = direction.split(" ")[0];
    const value = +direction.split(" ")[1];

    switch (operation) {
      case "forward":
        position.x += value;
        break;
      case "down":
        position.y += value;
        break;
      case "up":
        position.y -= value;
        break;
    }
  }

  return position;
};

const calculateAim = function (instructions) {
  const submarineData = { position: { x: 0, y: 0 }, aim: 0 };

  for (let instruction of instructions) {
    const operation = instruction.split(" ")[0];
    const value = +instruction.split(" ")[1];

    switch (operation) {
      case "forward":
        submarineData.position.x += value;
        submarineData.position.y += value * submarineData.aim;
        break;
      case "down":
        submarineData.aim += value;
        break;
      case "up":
        submarineData.aim -= value;
        break;
    }
  }

  return submarineData;
};

module.exports = {
  navigate,
  calculateAim
};
