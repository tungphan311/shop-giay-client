import React, { Component } from "react";

import { useDispatch } from "react-redux";

import "./AddPromotion.scss";

import AAddPromoteForm from "Components/Admin/Form/AddPromotion/AddPromotion";
import { ADD_SALE } from "state/reducers/ASaleReducer";

function AAddPromotion() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log("a");
    dispatch({ type: ADD_SALE });
  };
  return <AAddPromoteForm onSubmit={handleSubmit}></AAddPromoteForm>;
}
export default AAddPromotion;
