export const evaluateExpression = (expression: string): string => {
  try {
    expression = expression.replace(/×/g, "*").replace(/,/g, ".");

    expression = expression.replace(/(\d+(\.\d+)?)(%)/g, (match, p1) => {
      const number = parseFloat(p1);
      return `(${number} * 0.01)`;
    });

    expression = expression.replace(
      /(\d+(\.\d+)?)([\+\-\*\/])(\(\d+(\.\d+)? \* 0\.01\))/g,
      (match, num1, _, operator, percentExpression) => {
        return `${num1}${operator}(${num1} * ${percentExpression})`;
      }
    );

    expression = expression.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");

    const safeExpression = expression.replace(/[^-()\d/*+.Math.sqrt]/g, "");
    const result = new Function(`return ${safeExpression}`)();

    return (Math.round(result * 100) / 100).toString();
  } catch {
    return "Error";
  }
};
