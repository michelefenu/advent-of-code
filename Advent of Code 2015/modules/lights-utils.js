const manageLights = function (instructions) {
    const map = new Array(1000).fill(false).map(() => new Array(1000).fill(false));

    for(let instruction of instructions) {
        map = execute(map, instruction);
    }
}

const execute = function (map, instruction) {

}

module.exports = {
    manageLights
}