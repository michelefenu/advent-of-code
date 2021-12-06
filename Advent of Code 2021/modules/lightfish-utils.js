const calculatePopulation = (initialState) => {
    initialState = initialState.split(',').map(Number);
    console.log(initialState)
}

module.exports = {
    calculatePopulation
}