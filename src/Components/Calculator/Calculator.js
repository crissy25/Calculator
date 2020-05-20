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
    };
    this.updateEquation = this.updateEquation.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  updateEquation(value) {
    this.setState({ equation: this.state.equation.concat(value) });
  }

  evaluate() {
    let { equation } = this.state;
    let { history } = this.props;

    let result = eval(equation);
    history.push(equation + "=" + result);
    this.setState({
      equation: result.toString(),
      history: history,
    });
    this.props.updateHistory(history);
  }

  cancel() {
    let { equation } = this.state;
    equation = equation.substring(0, equation.length - 1);
    this.setState({ equation });
  }

  clear() {
    this.setState({ equation: "" });
  }

  render() {
    const { history } = this.props;
    const { equation } = this.state;
    return (
      <div className={"calculator-container"}>
        <h2>{"My Calculator"}</h2>
        <div>
          <div className={"display-screen"}>{equation}</div>

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
