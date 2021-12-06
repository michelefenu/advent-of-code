const getHydrothermalSourcesMap = (data, ignoreDiagonals = true) => {
  const map = Array(1000)
    .fill(0)
    .map(() => Array(1000).fill(0));

  const dataParseRegex = /(\d+),(\d+) -> (\d+),(\d+)/;

  for (let line of data) {
    const points = line.match(dataParseRegex);

    let start = { x: +points[1], y: +points[2] };
    let end = { x: +points[3], y: +points[4] };

    if (!ignoreDiagonals || start.x === end.x || start.y === end.y) {
      const incrementX = start.x < end.x ? 1 : start.x === end.x ? 0 : -1;
      const incrementY = start.y < end.y ? 1 : start.y === end.y ? 0 : -1;

      let x = start.x;
      let y = start.y;
      map[x][y] += 1;

      do {
        x += incrementX;
        y += incrementY;
        map[x][y] += 1;
      } while (x !== end.x || y !== end.y);
    }
  }

  return map.flat().filter((x) => x > 1).length;
};

module.exports = {
  getHydrothermalSourcesMap,
};
