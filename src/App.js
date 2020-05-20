import React from "react";
import { connect } from "react-redux";
import { ACTION_GET_INIT_DATA } from "./state/reducers/cInitReducer";
import Toastify from "Components/client/CToaster/Toasify";

const mapDispatchToProps = (dispatch) => ({
  cInitData: () => dispatch({ type: ACTION_GET_INIT_DATA }),
});

class App extends React.Component {
  componentDidMount = () => {
    this.props.cInitData();
  };

  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Toastify />
        {children}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
