const Regex = {
  trigfuncions_to_check:
    /((?<!a)(tan|cos|sin)|(atan|acos|asin))\((\-?\d+(\.\d+)?|pi|e)\)/gi,
  arithmetic_operation: /(\-?(\d+(\.\d+)?)\s?[\/\*\-\+]\s?\-?(\d+(\.\d+)?))/g,
  negativeSign_at_begining: /^\-/,
  doubleNegative: /(\-\-)/g,
  negativeSignAfterBracket: /(?<=\()\-/g,
  basicOperators: /[\/\*\-\+]/g,
  numbers: /-?[\d{1,}\.]{1,}/g,
  functionArg: /(?<=\().+(?=\))/,
  checkForPi: /\-?(\d+(\.\d+)?)?(pi)/g,
  checkForPowers: /\d+\^\d+/g,
  checkForLogs: /(log10)\(((\d+(\.\d+)?)|e|pi)\)|(log)\((\d+(\.\d+)?|e|pi)\)/g,
  checkForE: /(\d*e)/g,
  checkForFactorial: /((\d+)\!)/g,
};

module.exports = Regex;
