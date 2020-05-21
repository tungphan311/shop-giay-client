import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "./Toaster.scss";

class Toastify extends Component {
  render() {
    return (
      <div>
        <ToastContainer
          enableMultiContainer
          position="bottom-right"
          closeButton={false}
          draggable
          hideProgressBar
          newestOnTop
          autoClose={2000}
        />
      </div>
    );
  }
}

export default Toastify;
