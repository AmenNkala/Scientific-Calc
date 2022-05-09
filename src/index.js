//import { basicCompute } from "./basicCalc";
let lastClicked = ``;
const modifyArray = (array1, array2, index, operator) => {
  let temp_ans = Function(
    `return ${array1[index]} ${operator} ${array1[index + 1]}`
  )();
  array1.splice(index, 2, temp_ans);
  array2.splice(index, 1);
};

const basicCompute = (expression) => {
  const operands = expression.match(/-?[\d{1,}\.]{1,}/g).map(Number);
  const operators = expression
    .replaceAll(/\s/gi, "")
    .replaceAll(/[0-9\.]/gi, "")
    .split("");
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] == "*" || operators[i] == "/") {
      modifyArray(operands, operators, i, operators[i]);
      i = -1;
    }
  }
  for (let i = 0; i < operators.length; i++) {
    modifyArray(operands, operators, i, "+");
    i = -1;
  }
  return operands[0];
};

const validateMathExpression = (expression) => {
  if (/[\*\/\+\-]$/.test(expression) || /[\*\/\+\-]{2,}/.test(expression)) {
    input.classList.add("invalid");
    input.innerHTML += `<i class="fa-solid fa-triangle-exclamation"></i>`;
  } else {
    input.classList.remove("invalid");
  }
};
const output = document.getElementById("output");
const input = document.getElementById("input");

Array.from(document.getElementsByClassName("inputBtns")).map((button) => {
  button.addEventListener("click", () => {
    input.textContent += button.value;
    lastClicked = button.value;
    validateMathExpression(input.textContent);
  });
});

let ans = "";
const eqBtn = document.getElementById("eqBtn");
eqBtn.addEventListener("click", () => {
  let str = input.textContent;
  output.textContent = basicCompute(str);
});

document
  .getElementsByClassName("clearEntry")[0]
  .addEventListener("click", () => {
    let str = input.textContent;
    input.textContent = str.slice(0, -1);
    validateMathExpression(input.textContent);
  });

document.getElementsByClassName("clearAll")[0].addEventListener("click", () => {
  input.textContent = "";
  output.textContent = "";
});
