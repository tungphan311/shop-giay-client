import React from "react";
import { connect } from "react-redux";
import { ACTION_GET_INIT_DATA } from "./state/reducers/cInitReducer";
import Toastify from "Components/client/CToaster/Toasify";
import MessengerCustomerChat from "react-messenger-customer-chat";
import LoadingScreen from "Components/Admin/Loading/LoadingScreen";

const mapStateToProps = (state) => ({
  loading: state.aLoading.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cInitData: () => dispatch({ type: ACTION_GET_INIT_DATA }),
});

class App extends React.Component {
  componentDidMount = () => {
    this.props.cInitData();
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div className="App">
        <Toastify />
        <LoadingScreen show={loading} />
        {children}
        <MessengerCustomerChat
          pageId="100404311703422"
          appId="669729710256586"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
