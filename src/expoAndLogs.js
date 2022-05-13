const {
  checkForPowers,
  checkForLogs,
  functionArg,
  checkForE,
  checkForFactorial,
} = require("./regex");
const { expressionReplacer, checkForSymbol } = require("./utils");
const { piOperation } = require("./trigonometry");

const powerOperation = (expression) => {
  function callback(num) {
    num = num.split("^");
    return Math.pow(num[0], num[1]);
  }
  const products = expression
    .match(checkForPowers)
    .map((element) => callback(element));

  return expressionReplacer(expression, checkForPowers, products);
};

const logsFunction = (func_log, value) => {
  switch (func_log) {
    case "log":
      return Math.log(value);
    case "log10":
      return Math.log10(value);
  }
};

const eOperation = (expression) => {
  function callback(element) {
    return element === "e"
      ? Math.E
      : element
          .replace("e", "," + Math.E)
          .split(",")
          .map(Number)
          .reduce((a, b) => a * b);
  }

  const products = expression.match(checkForE).map((exp) => callback(exp));

  return expressionReplacer(expression, checkForE, products);
};

const logOperations = (expression) => {
  const products = expression.match(checkForLogs);
  const data = [];
  for (let i = 0; i < products.length; i++) {
    const TEMP_FUNC = products[i].includes("log10")
      ? products[i].slice(0, 5)
      : products[i].slice(0, 3);
    let value = products[i].match(functionArg);
    value[0] = checkForSymbol(value[0], "e", eOperation);
    value[0] = checkForSymbol(value[0], "pi", piOperation);
    data.push(logsFunction(TEMP_FUNC, value));
  }
  return expressionReplacer(expression, checkForLogs, data);
};

const factorial = (expression) => {
  let factors = expression.match(checkForFactorial);
  function factorial(n) {
    n = parseInt(n);
    if (n == 0 || n == 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  factors = factors.map((fact) =>
    fact.replace("!", "").split("").map(factorial).join("")
  );
  return expressionReplacer(expression, checkForFactorial, factors);
};

module.exports = { powerOperation, logOperations, eOperation, factorial };
