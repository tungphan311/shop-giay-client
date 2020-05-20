import { combineReducers } from "redux";
import { cAuthReducer } from "./cAuthReducer";
import { cCartReducer } from "./cCartReducer";
import { cProductReducer } from "./cProductReducer";
import { AAuthReducer } from "./AAuthReducer";
import { formReducer } from "state/reducers/formReducer";

export default combineReducers({
  form: formReducer,
  cauth: cAuthReducer,
  ccart: cCartReducer,
  cproduct: cProductReducer,
  aAuth: AAuthReducer,
});
