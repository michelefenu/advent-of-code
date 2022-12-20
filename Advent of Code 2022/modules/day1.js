const part1 = (input) => {
    const caloriesForEachElph = [];
    let sum = 0;
    for (let c of input) {
        if (c) {
            sum = sum + +c;
        } else {
            caloriesForEachElph.push(sum);
            sum = 0;
        }
    }

    const maxCalories = Math.max(...caloriesForEachElph);
    return maxCalories;
}

const part2 = (input) => {
    const caloriesForEachElph = [];
    let sum = 0;
    for (let c of input) {
        if (c) {
            sum = sum + +c;
        } else {
            caloriesForEachElph.push(sum);
            sum = 0;
        }
    }

    const sortedCalories = caloriesForEachElph.sort((a,b) => b-a);
    return sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
}

module.exports = {
    part1,
    part2
};