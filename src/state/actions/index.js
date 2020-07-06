import { createPromiseAction } from "@adobe/redux-saga-promise";
import { DELETE_SHOES } from "state/reducers/AShoesReducer";

export const addImportAction = createPromiseAction("ADD_IMPORT");

export const getShoesAction = createPromiseAction("GET_SHOES");

export const getCustomerAction = createPromiseAction("GET_CUSTOMER");
export const getGenderAction = createPromiseAction("GET_GENDER");

export const deleteShoesAction = createPromiseAction(DELETE_SHOES);

export const getOrderAction = createPromiseAction("GET_ORDER");

export const getOrderByIdAction = createPromiseAction("GET_ORDER_BY_ID");

export const updateOrderAction = createPromiseAction("UPDATE_ORDER");

export const getProviderAction = createPromiseAction("GET_PROVIDER");

export const deleteProviderAction = createPromiseAction("DELETE_PROVIDER");

export * from "./client/orderAction";
