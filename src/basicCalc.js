let str = `12+3.4-6*10/5*4-7`;

let operands = str
  .replaceAll(/[^0-9\.]/gi, ",")
  .split(",")
  .map(Number);

let ops = str.replaceAll(/[0-9\.]/gi, "").split("");
for (let i = 0; i < ops.length; i++) {
  if (ops[i] == "*") {
    let temp_ans = operands[i] * operands[i + 1];
    operands.splice(i, 2, temp_ans);
    ops.splice(i, 1);
    i = 0;
  }
}

/* console.log(operands);

for (let i = 0; i < ops.length; i++) {
  if (ops[i] == "/") {
    let temp_ans = operands[i] / operands[i + 1];
    operands.splice(i, 2, temp_ans);
    ops.splice(i, 1);
    i = 0;
  }
}

console.log(operands);

for (let i = 0; i < ops.length; i++) {
  if (ops[i] == "+") {
    let temp_ans = operands[i] + operands[i + 1];
    operands.splice(i, 2, temp_ans);
    ops.splice(i, 1);
    i = 0;
  }
}

console.log(operands);

for (let i = 0; i < ops.length; i++) {
  if (ops[i] == "-") {
    let temp_ans = operands[i] - operands[i + 1];
    operands.splice(i, 2, temp_ans);
    ops.splice(i, 1);
    i = -1;
  }
}

console.log(operands); */
