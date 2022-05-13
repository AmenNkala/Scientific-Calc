const { functionArg, trigfuncions_to_check, checkForPi } = require("./regex");
const { eOperation } = require("./expoAndLogs");
const { expressionReplacer, checkForSymbol } = require("./utils");

const rad_deg = {
  RADIAN: true,
};

const radiansToDegree = (callback, radians) => {
  radians = rad_deg.RADIAN ? radians : radians * (180 / Math.PI);
  return callback(radians);
};

const trigFunctions = (trig_func, angle) => {
  switch (trig_func) {
    case "sin":
      return radiansToDegree(Math.sin, angle);
    case "cos":
      return radiansToDegree(Math.cos, angle);
    case "tan":
      return radiansToDegree(Math.tan, angle);
    case "asin":
      return Math.asin(angle);
    case "acos":
      return Math.acos(angle);
    case "atan":
      return Math.atan(angle);
  }
};

const trigOperation = (expression) => {
  let products = expression.match(trigfuncions_to_check);
  let returnValues = [];
  for (let i = 0; i < products.length; i++) {
    const TEMP_FUNC =
      products[i][0] === "a"
        ? products[i].slice(0, 4)
        : products[i].slice(0, 3);
    let value = products[i].match(functionArg);
    value[0] = checkForSymbol(value[0], "pi", piOperation);
    value[0] = checkForSymbol(value[0], "e", eOperation);
    returnValues.push(trigFunctions(TEMP_FUNC, value[0]));
  }
  return expressionReplacer(expression, trigfuncions_to_check, returnValues);
};

const piOperation = (expression) => {
  function callback(element) {
    return element === "pi"
      ? Math.PI
      : element
          .replace("p", ",")
          .replace("i", Math.PI)
          .split(",")
          .map(Number)
          .reduce((a, b) => a * b);
  }

  const products = expression.match(checkForPi).map((exp) => callback(exp));

  return expressionReplacer(expression, checkForPi, products);
};

module.exports = { trigOperation, piOperation, rad_deg };
