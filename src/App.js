import React from "react";
import { connect } from "react-redux";
import { ACTION_GET_INIT_DATA } from "./state/reducers/cInitReducer";
import Toastify from "Components/client/CToaster/Toasify";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { initGA, PageView } from "Components/Tracking/index";

const mapDispatchToProps = (dispatch) => ({
  cInitData: () => dispatch({ type: ACTION_GET_INIT_DATA }),
});

class App extends React.Component {
  componentWillMount = () => {
    this.props.cInitData();
  };

  componentDidMount = () => {
    initGA("UA-171400327-1");
    PageView();
  };

  render() {
    const { children } = this.props;

    return (
      <div className="App">
        <Toastify />
        {children}
        <MessengerCustomerChat
          pageId="100404311703422"
          appId="669729710256586"
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
