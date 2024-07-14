import React, { useState } from "react";
import { evaluateExpression } from "./parser";
import "./index.css";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    if (result !== null) {
      setExpression(result + value);
      setResult(null);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult(null);
    setHistory(null);
  };

  const handleCalculate = () => {
    const calculatedResult = evaluateExpression(expression);
    setHistory(expression);
    setResult(calculatedResult);
    setExpression("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    } else if (e.key === "Escape") {
      handleClear();
    } else {
      const validKeys = "0123456789+-*/.√%";
      if (validKeys.includes(e.key)) {
        handleButtonClick(e.key);
      }
    }
  };

  return (
    <div className="calculator" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="display">
        {history && <div className="expression">{history}</div>}
        <div className="result">
          {result !== null ? result : expression || "0"}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleClear}>C</button>
        {[
          "√",
          "%",
          "/",
          "7",
          "8",
          "9",
          "×",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "+",
          "00",
          "0",
          ",",
          "=",
        ].map((value) => (
          <button
            key={value}
            onClick={() =>
              value === "=" ? handleCalculate() : handleButtonClick(value)
            }
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
