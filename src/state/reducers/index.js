import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { cAuthReducer } from "./cAuthReducer";
import { cCartReducer } from "./cCartReducer";

export default combineReducers({
  form: formReducer,
  cauth: cAuthReducer,
  ccart: cCartReducer,
});
