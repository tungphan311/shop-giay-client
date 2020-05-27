import { combineReducers } from "redux";
import { cAuthReducer } from "./cAuthReducer";
import { cCartReducer } from "./cCartReducer";
import { cProductReducer } from "./cProductReducer";
import { AAuthReducer } from "./AAuthReducer";
import { AShoesReducer } from "state/reducers/AShoesReducer";
import { formReducer } from "state/reducers/formReducer";
import { aImportReducer } from "state/reducers/aImportReducer";

export default combineReducers({
  form: formReducer,
  cauth: cAuthReducer,
  ccart: cCartReducer,
  cproduct: cProductReducer,
  aAuth: AAuthReducer,
  aShoes: AShoesReducer,
  aImport: aImportReducer,
});
