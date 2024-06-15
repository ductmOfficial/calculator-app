import React, { useState, useEffect, useCallback } from "react";

// styles
import "./App.css";

const DIGIT_LIMIT_TEXT = "Digit Limit Met";
const OPERATOR_REGEX = /[x/+‑]/;
const ENDS_WITH_OPERATOR_REGEX = /[x+‑/]$/;
const ENDS_WITH_NEGATIVE_SIGN_REGEX = /\d[x/+‑]{1}‑$/;

const CalculatorHelper = {
  getSanitizedExpression: (expression) => {
    let sanitizedExpression = expression;
    while (ENDS_WITH_OPERATOR_REGEX.test(sanitizedExpression)) {
      sanitizedExpression = sanitizedExpression.slice(0, -1);
    }
    sanitizedExpression = sanitizedExpression
      .replace(/x/g, "*")
      .replace(/‑/g, "-")
      .replace("--", "+0+0+0+0+0+0+");
    return sanitizedExpression;
  },
  evaluateExpression: (expression) => {
    return (
      // eslint-disable-next-line no-eval
      (Math.round(1000000000000 * eval(expression)) / 1000000000000).toString()
    );
  },
};

const App = () => {
  const [previousValue, setPreviousValue] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [formula, setFormula] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);

  const resetCalculator = useCallback(() => {
    setCurrentValue("0");
    setPreviousValue("0");
    setFormula("");
    setIsEvaluated(false);
  }, []);

  const displayMaxDigitWarning = useCallback(() => {
    setPreviousValue(currentValue);
    setCurrentValue(DIGIT_LIMIT_TEXT);
    setTimeout(() => setCurrentValue(previousValue), 1000);
  }, [currentValue, previousValue]);

  const handleNumberClick = useCallback(
    (value) => {
      if (currentValue.includes(DIGIT_LIMIT_TEXT)) return;

      if (currentValue.length > 21) {
        displayMaxDigitWarning();
      } else if (isEvaluated) {
        setCurrentValue(value);
        setFormula(value !== "0" ? value : "");
      } else {
        setCurrentValue(
          currentValue === "0" || OPERATOR_REGEX.test(currentValue)
            ? value
            : currentValue + value
        );
        setFormula(
          currentValue === "0" && value === "0"
            ? formula === ""
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
        );
      }
      setIsEvaluated(false);
    },
    [currentValue, displayMaxDigitWarning, formula, isEvaluated]
  );

  const handleOperatorClick = useCallback(
    (value) => {
      if (currentValue.includes(DIGIT_LIMIT_TEXT)) return;

      if (isEvaluated) {
        setFormula(`${previousValue}${value}`);
      } else if (!ENDS_WITH_OPERATOR_REGEX.test(formula)) {
        setPreviousValue(formula);
        setFormula(formula + value);
      } else if (!ENDS_WITH_NEGATIVE_SIGN_REGEX.test(formula)) {
        setFormula(
          (ENDS_WITH_NEGATIVE_SIGN_REGEX.test(formula + value)
            ? formula
            : previousValue) + value
        );
      } else if (value !== "-") {
        setFormula(previousValue + value);
      }

      setCurrentValue(value);
      setIsEvaluated(false);
    },
    [currentValue, formula, isEvaluated, previousValue]
  );

  const handleDecimalClick = useCallback(() => {
    if (isEvaluated) {
      setCurrentValue("0.");
      setFormula("0.");
      setIsEvaluated(false);
    } else if (
      !currentValue.includes(".") &&
      !currentValue.includes(DIGIT_LIMIT_TEXT)
    ) {
      if (currentValue.length > 21) {
        displayMaxDigitWarning();
      } else if (
        ENDS_WITH_OPERATOR_REGEX.test(formula) ||
        (currentValue === "0" && formula === "")
      ) {
        setCurrentValue("0.");
        setFormula(`${formula}0.`);
      } else {
        setCurrentValue(formula.match(/(-?\d+\.?\d*)$/)[0] + ".");
        setFormula(`${formula}.`);
      }
      setIsEvaluated(false);
    }
  }, [currentValue, displayMaxDigitWarning, formula, isEvaluated]);

  const handleEvaluateClick = useCallback(() => {
    if (currentValue.includes(DIGIT_LIMIT_TEXT)) return;

    const sanitizedExpression =
      CalculatorHelper.getSanitizedExpression(formula);
    const answer = CalculatorHelper.evaluateExpression(sanitizedExpression);

    setCurrentValue(answer);
    setPreviousValue(answer);
    setFormula(`${formula}=${answer}`);
    setIsEvaluated(true);
  }, [currentValue, formula]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;
      if (!isNaN(key)) {
        handleNumberClick(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperatorClick(key === "*" ? "x" : key);
      } else if (key === "Enter") {
        handleEvaluateClick();
      } else if (key === ".") {
        handleDecimalClick();
      } else if (key === "Backspace") {
        resetCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    handleNumberClick,
    handleOperatorClick,
    handleEvaluateClick,
    handleDecimalClick,
    resetCalculator,
  ]);

  const buttons = [
    { id: "clear", value: "AC", onClick: resetCalculator },
    { id: "divide", value: "/", onClick: handleOperatorClick },
    { id: "multiply", value: "x", onClick: handleOperatorClick },
    { id: "seven", value: "7", onClick: handleNumberClick },
    { id: "eight", value: "8", onClick: handleNumberClick },
    { id: "nine", value: "9", onClick: handleNumberClick },
    { id: "subtract", value: "‑", onClick: handleOperatorClick },
    { id: "four", value: "4", onClick: handleNumberClick },
    { id: "five", value: "5", onClick: handleNumberClick },
    { id: "six", value: "6", onClick: handleNumberClick },
    { id: "add", value: "+", onClick: handleOperatorClick },
    { id: "one", value: "1", onClick: handleNumberClick },
    { id: "two", value: "2", onClick: handleNumberClick },
    { id: "three", value: "3", onClick: handleNumberClick },
    { id: "equals", value: "=", onClick: handleEvaluateClick },
    { id: "zero", value: "0", onClick: handleNumberClick },
    { id: "decimal", value: ".", onClick: handleDecimalClick },
  ];

  return (
    <div className="App">
      <div className="calculator">
        <div className="formula-screen">{formula}</div>
        <div id="display" className="output-screen">
          {currentValue}
        </div>
        <div className="input-screen">
          {buttons.map((button) => (
            <div
              key={button.id}
              id={button.id}
              data-value={button.value}
              onClick={() => button.onClick(button.value)}
            >
              {button.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
