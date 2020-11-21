const fs = require('fs')
const chalk = require('chalk')

const day = +process.argv.slice(2)[0]

if(typeof day !== 'number' || isNaN(day)) {
  console.log(chalk.red('You must specify a day e.g. npm run solve -- 2'))
  return;
}

const input = fs
  .readFileSync(`puzzles/day-${day.toString().padStart(2,'0')}/input.txt`)
  .toString()
  .split('\n')

const solver = require(`./puzzles/day-${day.toString().padStart(2,'0')}/solver`)

console.log(chalk.green(`Solving Day ${day}...`))
console.log(solver.solve(input))

