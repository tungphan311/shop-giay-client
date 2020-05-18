import React from "react";
import { connect } from "react-redux";
import { ACTION_VERIFY_TOKEN } from "./state/reducers/cAuthReducer";

const mapDispatchToProps = (dispatch) => ({
  cVerifyToken: () => dispatch({ type: ACTION_VERIFY_TOKEN }),
});

class App extends React.Component {
  componentDidMount = () => {
    this.props.cVerifyToken();
  };

  render() {
    const { children } = this.props;
    return <div className="App">{children}</div>;
  }
}

export default connect(null, mapDispatchToProps)(App);
