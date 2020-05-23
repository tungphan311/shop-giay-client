import { createPromiseAction } from "@adobe/redux-saga-promise";
import { ADD_IMPORT } from "state/reducers/aImportReducer";

export const addImportAction = createPromiseAction("ADD_IMPORT");
