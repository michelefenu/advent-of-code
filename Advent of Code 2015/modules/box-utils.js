const getBoxPaperQty = function(dimensions) {
    const [l, w, h] = dimensions.split('x').map(x => +x);
    const sides = [l * w, w * h, h * l];
    const smallestSide = Math.min(...sides);
    const totalWrappingPaper = sides.reduce((a, b) => a + 2 * b, 0);

    return totalWrappingPaper + smallestSide;
};

const getRibbonLength = function(dimensions) {
    const [l, w, h] = dimensions.split('x').map(x => +x);
    const sortedSides = [l, w, h].sort((a, b) => a - b);

    return 2 * sortedSides[0] + 2 * sortedSides[1] + l * w * h;
}

module.exports = {
   getBoxPaperQty,
    getRibbonLength
}