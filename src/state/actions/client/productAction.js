import { createPromiseAction } from "@adobe/redux-saga-promise";

export const clientGetProductAction = createPromiseAction("CLIENT_GET_PRODUCT");

export const clientGetNewArrivalsAction = createPromiseAction(
  "CLIENT_GET_NEW_ARRIVALS"
);
