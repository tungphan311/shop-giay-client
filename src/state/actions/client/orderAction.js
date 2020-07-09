import { createPromiseAction } from "@adobe/redux-saga-promise";

export const clientGetOrderAction = createPromiseAction("CLIENT_GET_ORDER");

export const clientGetOrderByIdAction = createPromiseAction(
  "CLIENT_GET_ORDER_BY_ID"
);
