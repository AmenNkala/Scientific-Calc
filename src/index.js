const answerField = document.getElementById("answer");

const digitsBtns = document.getElementsByClassName("digits");

for (let i = 0; i < digitsBtns.length; i++) {
  digitsBtns[i].addEventListener("click", () => {
    answerField.value += digitsBtns[i].value;
    if (ans !== "") {
      answerField.value = digitsBtns[i].value;
    }
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
    ans = `${Function(`return ${answerField.value};`)()}`;
    answerField.value = ans;
  }
});
