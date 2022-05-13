const expressionReplacer = (expression, replacer, container) => {
  expression = expression.replaceAll(replacer, "x");

  for (let i = 0; i < container.length; i++) {
    expression = expression.replace("x", container[i]);
  }
  return expression;
};

const checkForSymbol = (symbol, checkAgainst, functionToReturn) => {
  if (symbol === checkAgainst) return functionToReturn(symbol);
  return symbol;
};

module.exports = { expressionReplacer, checkForSymbol };
