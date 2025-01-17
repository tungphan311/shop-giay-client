import React from "react";
import "./CSignUp.scss";
import { useDispatch } from "react-redux";
import { ACTION_SIGNUP } from "state/reducers/cAuthReducer";
import CSignUpForm from "Components/client/CSignUp/CSignUpForm";
const CSignUp = () => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({ type: ACTION_SIGNUP });
  };

  return (
    <div className="clientsignup-wrapper d-flex align-items-center justify-content-center text-center">
      <div>
        <img
          className="big-logo"
          src="/images/shopgiay.png"
          alt=""
          style={{ maxWidth: "30%" }}
        />
        <CSignUpForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CSignUp;
