import React from "react";
import { connect } from "react-redux";
import Calculator from "./Calculator/Calculator";
import { updateHistory } from "../actions";
class App extends React.Component {
  render() {
    return (
      <Calculator
        history={this.props.history}
        updateHistory={this.props.updateHistory}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateHistory: (history) => dispatch(updateHistory(history)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
