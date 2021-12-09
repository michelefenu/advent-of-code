const getLowerPoints = (input) => {
  const map = input.map((line) => line.split("").map(Number));

  const height = input.length;
  const width = input[0].length;

  let totalRiskLevel = 0;
  let lowerPoints = [];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const lowerThanUp = typeof map[row - 1] === "undefined" || map[row][col] < map[row - 1][col];
      const lowerThanRight =
        typeof map[row][col + 1] === "undefined" || map[row][col] < map[row][col + 1];
      const lowerThanDown =
        typeof map[row + 1] === "undefined" || map[row][col] < map[row + 1][col];
      const lowerThanLeft =
        typeof map[row][col - 1] === "undefined" || map[row][col] < map[row][col - 1];

      if (lowerThanUp && lowerThanRight && lowerThanDown && lowerThanLeft) {
        lowerPoints.push({ x: row, y: col });
        totalRiskLevel = totalRiskLevel + map[row][col] + 1;
      }
    }
  }

  return { totalRiskLevel, lowerPoints };
};

const calculateBasinsSizes = (input) => {
  // Replace 0 with one to awoid falsy values
  const map = input.map((line) =>
    line
      .split("")
      .map(Number)
      .map((x) => (!x ? "1" : x))
  );
  const lowerPoints = getLowerPoints(input).lowerPoints;

  const basinSizes = [];
  for (let lowerPoint of lowerPoints) {
    basinSizes.push(getBasinSize(map, lowerPoint));
  }

  const biggestBasins = basinSizes.sort((a, b) => b - a).filter((v, i) => i < 3);

  return biggestBasins.reduce((acc, val) => acc * val, 1);
};

const getBasinSize = (map, point) => {
  let basinMap = Array(map.length)
    .fill()
    .map(() => Array(map[0].length).fill("o"));

  basinMap = calculateBasinMap(basinMap, map, point);

  return basinMap.flat().filter((x) => x === "x").length;
};

const calculateBasinMap = (basinMap, map, point) => {
  if (basinMap[point.x][point.y] === "x") return basinMap;
  basinMap[point.x][point.y] = "x";
  if (map[point.x - 1] && map[point.x - 1][point.y] !== 9) {
    basinMap = calculateBasinMap(basinMap, map, { x: point.x - 1, y: point.y });
  }
  if (map[point.x + 1] && map[point.x + 1][point.y] !== 9) {
    basinMap = calculateBasinMap(basinMap, map, { x: point.x + 1, y: point.y });
  }
  if (map[point.x][point.y - 1] && map[point.x][point.y - 1] !== 9) {
    basinMap = calculateBasinMap(basinMap, map, { x: point.x, y: point.y - 1 });
  }
  if (map[point.x][point.y + 1] && map[point.x][point.y + 1] !== 9) {
    basinMap = calculateBasinMap(basinMap, map, { x: point.x, y: point.y + 1 });
  }

  return basinMap;
};

module.exports = {
  getLowerPoints,
  calculateBasinsSizes,
};
