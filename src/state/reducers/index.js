import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { cAuthReducer } from "./cAuthReducer";
import { cCartReducer } from "./cCartReducer";
import { cProductReducer } from "./cProductReducer";
import { AAuthReducer } from "./AAuthReducer";

export default combineReducers({
  form: formReducer,
  cauth: cAuthReducer,
  ccart: cCartReducer,
  cproduct: cProductReducer,
  aAuth: AAuthReducer,
});
