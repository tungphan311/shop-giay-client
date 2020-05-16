import { combineReducers } from "redux";
import { AAuthReducer } from "./AAuthReducer";

export default combineReducers({
  aAuth: AAuthReducer,
});
