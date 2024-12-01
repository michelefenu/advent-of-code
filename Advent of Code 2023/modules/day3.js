

const part1 = (input) => {
    const duplicates = input.map(x => getPriority(x[0].filter((y) => x[1].includes(y))[0]));
    const priorities = duplicates.reduce((acc, val) => acc + val, 0);
    return priorities;
}

const part2 = (input) => {
    const duplicates = input.map(x => getPriority(x[0].filter((y) => x[1].includes(y) && x[2].includes(y))[0]));
    const priorities = duplicates.reduce((acc, val) => acc + val, 0);

    return priorities;
}

function getPriority(c) {
    if(c === c.toUpperCase()) {
        return c.charCodeAt() - 38;
    } else {
        return c.charCodeAt() - 96;
    }
}



module.exports = {
    part1, part2
}