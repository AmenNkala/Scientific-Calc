const { create, all } = require("mathjs");
const config = {
  epsilon: 1e-12,
  number: "number",
  precision: 10,
  predictable: false,
};
const math = create(all, config);

const basicCalc = (x, y, operator) => {
  let value1 = parseFloat(x);
  let value2 = parseFloat(y);
  let returnValue = 0;
  switch (operator) {
    case "*":
      returnValue = value1 * value2;
      break;
    case "/":
      returnValue = value1 / value2;
      break;
    case "+":
      returnValue = value1 + value2;
      break;
    case "-":
      returnValue = value1 - value2;
      break;
  }
  return returnValue;
};
let RADIAN = true;

const radiansToDegree = (callback, angle) => {
  if (!RADIAN) return callback(math.unit(angle, "deg"));
  return callback(math.unit(angle, "rad"));
};

const trigFunctions = (trig_func, angle) => {
  switch (trig_func) {
    case "sin":
      return radiansToDegree(math.sin, angle);
    case "cos":
      return radiansToDegree(math.cos, angle);
    case "tan":
      return radiansToDegree(math.tan, angle);
    case "arcsin":
      return math.asin(angle);
    case "arccos":
      return math.acos(angle);
    case "arctan":
      return math.atan(angle);
  }
};

const trigOperation = (container) => {
  let returnValues = [];
  for (let i = 0; i < container.length; i++) {
    const TEMP_FUNC = container[i].includes("arc")
      ? container[i].slice(0, 6)
      : container[i].slice(0, 3);
    let value = container[i].match(/(?<=\().+(?=\))/);
    if (value[0] === "PI") value[0] = math.pi;
    if (value[0] === "E") value[0] = math.e;
    returnValues.push(trigFunctions(TEMP_FUNC, value[0]));
  }

  return returnValues;
};

const Regex = {
  trigfuncions_to_check:
    /((?<!arc)(tan|cos|sin)|(arctan|arccos|arcsin))\((\-?\d+(\.\d+)?|PI|E)\)/gi,
  arithmetic_operators: /[\/|\*|\+|\-]/g,
};

const expressionCalc = (expression) => {
  if (Regex.trigfuncions_to_check.test(expression)) {
    let trig = expression.match(Regex.trigfuncions_to_check);
    expression = expression.replaceAll(Regex.trigfuncions_to_check, "x");
    trig = trigOperation(trig);

    for (let i = 0; i < trig.length; i++) {
      expression = expression.replace("x", trig[i]);
    }
  }

  if (Regex.arithmetic_operators.test(expression)) {
    const operands = expression.match(/-?[\d{1,}\.]{1,}/g).map(Number);
    expression = expression
      .replace(/^\-/, "")
      .replaceAll(/(\-\-)/g, "+")
      .replaceAll(/(?<=\()\-/g, "");
    const operators = expression.match(Regex.arithmetic_operators);

    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === "*" || operators[i] === "/") {
        const TEMP_ANS = basicCalc(operands[i], operands[i + 1], operators[i]);
        operands.splice(i, 2, TEMP_ANS);
        operators.splice(i, 1);
        i = -1;
      }
    }
    expression = operands.reduce((a, b) => a + b);
  }
  return expression;
};

console.log(expressionCalc(""));

module.exports = { expressionCalc };
