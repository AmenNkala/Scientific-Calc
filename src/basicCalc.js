//let str = `12+3.5-6*10/5*4-7`;
let str = `12/3.5*6*10/5*4*7`;

const modifyArray = (array1, array2, index, operator) => {
  let temp_ans = Function(
    `return ${array1[index]} ${operator} ${array1[index + 1]}`
  )();
  array1.splice(index, 2, temp_ans);
  array2.splice(index, 1);
  index = -1;
};

export const basicCompute = (expression) => {
  const operands = expression.match(/-?[\d{1,}\.]{1,}/g).map(Number);
  const operators = expression.replaceAll(/[0-9\.]/gi, "").split("");
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] == "*" || operators[i] == "/") {
      modifyArray(operands, operators, i, operators[i]);
    }
  }
  for (let i = 0; i < operators.length; i++) {
    modifyArray(operands, operators, i, "+");
  }
  return operands[0];
};
