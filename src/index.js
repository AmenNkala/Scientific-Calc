//import { basicCompute } from "./basicCalc";

const modifyArray = (array1, array2, index, operator) => {
  let temp_ans = Function(
    `return ${array1[index]} ${operator} ${array1[index + 1]}`
  )();
  array1.splice(index, 2, temp_ans);
  array2.splice(index, 1);
};

const basicCompute = (expression) => {
  const operands = expression.match(/-?[\d{1,}\.]{1,}/g).map(Number);
  const operators = expression.replaceAll(/[0-9\.]/gi, "").split("");
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
const output = document.getElementById("output");

const digitsBtns = document.getElementsByClassName("digits");

for (let i = 0; i < digitsBtns.length; i++) {
  digitsBtns[i].addEventListener("click", () => {
    answerField.value += digitsBtns[i].value;
  });
}

const operatorBtnsArr = Array.from(
  document.getElementsByClassName("operatorBtn")
);

operatorBtnsArr.map((button) => {
  button.addEventListener("click", () => {
    answerField.value += button.value;
  });
});
let ans = "";
const eqBtn = document.getElementById("eqBtn");
eqBtn.addEventListener("click", () => {
  let str = answerField.value;

  if (/[=]/g.test(str) || str === "") {
    answerField.value = "";
  } else {
    ans = Function(`return ${answerField.value};`)();
    answerField.value = ans;
  }
});
