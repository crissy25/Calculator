import React from "react";
import { Button } from "../Button/Button";
import { History } from "../History/History";
import "./Calculator.css";

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ["+", "-", "*", "/"];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: "",
      result: "",
    };
    this.updateEquation = this.updateEquation.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  updateEquation(value) {
    let { equation, result } = this.state;

    // if the entered value is an operator
    // checking to see that you cannot add two operator together
    if (
      isNaN(value) &&
      equation[equation.length - 1] &&
      isNaN(parseFloat(equation[equation.length - 1]))
    )
      equation = equation.substring(0, equation.length - 1);

    // if last value is a number and its 0, check if current value is a number, check if 2nd last value is an operator\
    // eliminate teh zero
    if (
      !isNaN(equation[equation.length - 1]) &&
      equation[equation.length - 1] === "0" &&
      !isNaN(value) &&
      (equation.length === 1 ||
        operators.includes(equation[equation.length - 2]))
    )
      equation = equation.substring(0, equation.length - 1);

    // handle adding of initial operators / *
    if (equation.length === 0 && (value === "*" || value === "/")) {
    } // do nothing
    else equation = equation.concat(value);

    // to avoid if last entered value was operator - just dont eval
    if (!isNaN(value)) result = +eval(equation).toFixed(2); // the +helps to avoid .00 if no numbers after decimal

    this.setState({ equation, result });
  }

  evaluate() {
    let { equation } = this.state;
    let { history } = this.props;

    let result = +eval(equation).toFixed(2);
    history.push(equation + "=" + result);
    this.setState({
      equation: result.toString(),
      history: history,
      result: "",
    });
    this.props.updateHistory(history);
  }

  cancel() {
    let { equation, result } = this.state;
    equation = equation.substring(0, equation.length - 1);
    result = +eval(equation).toFixed(2);
    this.setState({ equation, result });
  }

  clear() {
    this.setState({ equation: "", result: "" });
  }

  render() {
    const { history } = this.props;
    const { equation, result } = this.state;
    return (
      <div className={"calculator-container"}>
        <h2>{"My Calculator"}</h2>
        <div>
          <div className={"display-screen"}>
            <div>{equation}</div>
            {!(equation === result.toString()) && (
              <div className={"result-styling"}>{result}</div>
            )}
          </div>

          <div>
            <div className={"button-section-styling"}>
              {digits &&
                digits.length > 0 &&
                digits.map((digit, index) => (
                  <Button
                    onClick={() => this.updateEquation(digit)}
                    value={digit}
                    key={index}
                  />
                ))}
            </div>
          </div>

          <div className={"button-section-styling"}>
            {operators &&
              operators.length > 0 &&
              operators.map((operator, index) => (
                <Button
                  onClick={() => this.updateEquation(operator)}
                  value={operator}
                  key={index}
                />
              ))}
          </div>

          <div className={"button-section-styling"}>
            <Button onClick={() => this.cancel()} value={"Cancel"} />
            <Button onClick={() => this.clear()} value={"Clear"} />
            <Button onClick={() => this.evaluate()} value={"Evaluate"} />
          </div>
        </div>
        {history && history.length > 0 && <History history={history} />}
      </div>
    );
  }
}

export default Calculator;
