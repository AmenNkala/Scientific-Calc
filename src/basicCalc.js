const { trigOperation, piOperation } = require("./trigonometry");
const {
  eOperation,
  logOperations,
  powerOperation,
  factorial,
} = require("./expoAndLogs");
const {
  arithmetic_operation,
  doubleNegative,
  negativeSignAfterBracket,
  negativeSign_at_begining,
  trigfuncions_to_check,
  basicOperators,
  numbers,
  checkForPi,
  checkForE,
  checkForLogs,
  checkForPowers,
  checkForFactorial,
} = require("./regex");

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

const expressionCalc = (expression) => {
  //------------------- math constants--------------
  if (checkForPi.test(expression)) {
    expression = piOperation(expression);
  }
  if (checkForE.test(expression)) {
    expression = eOperation(expression);
  }

  //---------------- solve powers first-------------
  if (checkForPowers.test(expression)) {
    expression = powerOperation(expression);
  }

  //---------------- logarithms --------------------
  if (checkForLogs.test(expression)) {
    expression = logOperations(expression);
  }

  //---------------- trigonometry-------------------
  if (trigfuncions_to_check.test(expression)) {
    expression = trigOperation(expression);
  }

  //---------------- factorials --------------------
  if (checkForFactorial.test(expression)) {
    expression = factorial(expression);
  }

  //--------------- arithmetic --------------------
  if (arithmetic_operation.test(expression)) {
    const operands = expression.match(numbers).map(Number);
    expression = expression
      .replace(negativeSign_at_begining, "")
      .replaceAll(doubleNegative, "+")
      .replaceAll(negativeSignAfterBracket, "");
    const operators = expression.match(basicOperators);

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

console.log(expressionCalc("log10(e)"));

module.exports = { expressionCalc };
