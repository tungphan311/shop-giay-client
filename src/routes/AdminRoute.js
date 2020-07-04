import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { SET_AUTHORIZE } from "state/reducers/aLoadingReducer";
import { compose } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  resetAuthorize: () => dispatch({ type: SET_AUTHORIZE }),
});

export class AdminRoute extends Component {
  componentWillMount = () => {
    this.unlisten = this.props.history.listen(() => {
      this.props.resetAuthorize();
    });
  };

  componentWillUnmount = () => {
    this.unlisten();
  };

  render() {
    return <>{this.props.children}</>;
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(AdminRoute);
