let sign = 1;
let c = 1;
let input = 12;
let x = 0;
let y = 0;
let i = 1;

while (i < input) {
  for (var j = 0; j < c && i < input; j++ , i++) { x = x + sign; }
  for (var j = 0; j < c && i < input; j++ , i++) { y = y + sign; }

  c = c + 1;
  sign = sign * -1;
}

console.log(Math.abs(x) + Math.abs(y));