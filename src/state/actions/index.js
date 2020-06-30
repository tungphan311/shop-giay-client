import { createPromiseAction } from "@adobe/redux-saga-promise";
import { DELETE_SHOES } from "state/reducers/AShoesReducer";

export const addImportAction = createPromiseAction("ADD_IMPORT");

export const getShoesAction = createPromiseAction("GET_SHOES");

export const getCustomerAction = createPromiseAction("GET_CUSTOMER");
export const getGenderAction = createPromiseAction("GET_GENDER");

export const deleteShoesAction = createPromiseAction(DELETE_SHOES);

export const getOrderAction = createPromiseAction("GET_ORDER");
