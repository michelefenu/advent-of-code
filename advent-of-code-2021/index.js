const fs = require('fs')
const chalk = require('chalk')

let puzzleDay = +process.argv.slice(2)[0]
let puzzlePart = +process.argv.slice(2)[1]

if (typeof puzzleDay !== 'number' || isNaN(puzzleDay)) {
  console.log(chalk.green('You must specify a day e.g. npm run solve -- 2'))
}

if (typeof puzzlePart !== 'number' || isNaN(puzzlePart)) {
  console.log(chalk.green('No part specified, solving for both parts...'))
  console.log(chalk.white('To solve a single part type npm run solve -- 2 1'))
}

for (let day of puzzleDay && [puzzleDay] || [...Array(26).keys()].splice(1)) {
  for (let part of puzzlePart && [puzzlePart] || [1, 2]) {
    const input = fs
      .readFileSync(`puzzles/day-${day.toString().padStart(2, '0')}/input.txt`)
      .toString()
      .replace(/\r/g, '')
      .split('\n')

    const solver = require(`./puzzles/day-${day.toString().padStart(2, '0')}/part${part}`)

    console.log(chalk.green(`Solving Day ${day} part ${part}...`))

    try {
      console.log(chalk.white('Output: '), chalk.bgWhite.blackBright(solver.solve(input)))
    } catch (error) {
      console.log(chalk.yellow(error))
    }
  }
}


