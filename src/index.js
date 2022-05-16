const { expressionCalc } = require("./basicCalc");
const { rad_deg } = require("./trigonometry");

const inputButtons = document.getElementsByClassName("inputBtns");
const inputsDisplay = document.getElementById("inputs");
const outputDisplay = document.getElementById("outputs");
const operators = document.getElementsByClassName("operators");
const functionsBtns = document.getElementsByClassName("functions");
const ans = document.getElementById("ans");
const radiansBtn = document.getElementById("radiansBtn");
const degreesBtn = document.getElementById("degreesBtn");

let displayString = ``;
let memory = [];

const writeToScreen = (value) => {
  displayString = inputsDisplay.value;
  if (!validateExpression(displayString)) {
    inputsDisplay.classList.toggle("invalid");
  } else {
    inputsDisplay.classList.remove("invalid");
  }
};

Array.from(inputButtons).map((button) => {
  button.addEventListener("click", () => {
    writeToScreen(button.innerText);
  });
});

Array.from(operators).map((button) => {
  button.addEventListener("click", () => {
    writeToScreen(button.innerText);
  });
});

Array.from(functionsBtns).map((button) => {
  button.addEventListener("click", () => {
    writeToScreen(`${button.innerText}(`);
  });
});

document.getElementById("root").addEventListener("click", (e) => {
  writeToScreen(e.target.innerText + "(");
});

document.getElementById("power").addEventListener("click", (e) => {
  writeToScreen(e.target.value);
});

document.getElementById("fact").addEventListener("click", () => {
  writeToScreen("!");
});

document.getElementById("equals").addEventListener("click", () => {
  ans.value = outputDisplay.textContent = expressionCalc(replaceInvalid());
  console.log(replaceInvalid());
  if (memory.length === 8) {
    memory = [];
    document.getElementsByClassName("history")[0].innerHTML = "";
  } else {
    memory.push(`${inputsDisplay.textContent} = ${ans.value}\n`);
    let p = document.createElement("p");
    p.innerText = memory[memory.length - 1];
    document.getElementsByClassName("history")[0].appendChild(p);
  }
  animateAns();
});

document
  .getElementsByClassName("clearEntry")[0]
  .addEventListener("click", () => {
    displayString = displayString.substring(0, displayString.length - 1);
    inputsDisplay.textContent = displayString;
  });

document.getElementsByClassName("clearAll")[0].addEventListener("click", () => {
  displayString = "";
  inputsDisplay.textContent = displayString;
  outputDisplay.textContent = "";
});

document.getElementById("ans").addEventListener("click", () => {
  if (outputDisplay.textContent !== "") {
    displayString = ans.value;
    inputsDisplay.textContent = displayString;
    outputDisplay.textContent = "";
  } else {
    displayString += ans.value;
    inputsDisplay.textContent = displayString;
  }
});

radiansBtn.addEventListener("click", () => {
  if (!radiansBtn.classList.contains("active_angle")) {
    radiansBtn.classList.toggle("active_angle");
    degreesBtn.classList.remove("active_angle");
    rad_deg.RADIAN = true;
  }
});

degreesBtn.addEventListener("click", () => {
  if (!degreesBtn.classList.contains("active_angle")) {
    degreesBtn.classList.toggle("active_angle");
    radiansBtn.classList.remove("active_angle");
    rad_deg.RADIAN = false;
  }
});

inputsDisplay.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("equals").click();
  }
});

const replaceInvalid = () => {
  return displayString
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\−/g, "-")
    .replace(/\√/g, "sqrt")
    .replace(/(cos-1)/g, "acos")
    .replace(/(sin-1)/g, "asin")
    .replace(/(tan-1)/g, "atan")
    .replace(/(x\!)/g, "factorial")
    .replace(/π/g, "pi")
    .replace(/(log)/g, "log10")
    .replace(/(ln)/g, "log");
};

const animateAns = () => {
  outputDisplay.style.animation = "big 0.5s ease-in-out";
  outputDisplay.style.animationFillMode = "forwards";
};

const validateExpression = (expression) => {
  if (/[\/\*]{2,}/g.test(expression)) return false;
  if (/^[\/\*]/.test(expression)) return false;
  if (/(?<=\/)[0]/g.test(expression)) return false;
  if (/[\/\*\-\+](?=\))/g.test(expression)) return false;
  if (/(\/$|\*$|\-$|\+$)/.test(expression)) return false;
  return true;
};
