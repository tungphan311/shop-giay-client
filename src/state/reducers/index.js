import { combineReducers } from "redux";
import { cAuthReducer } from "./cAuthReducer";
import { cCartReducer } from "./cCartReducer";
import { cProductReducer } from "./cProductReducer";
import { AAuthReducer } from "./AAuthReducer";
import { AShoesReducer } from "state/reducers/AShoesReducer";
import { formReducer } from "state/reducers/formReducer";
import { aImportReducer } from "state/reducers/aImportReducer";
import { cCustomerReducer } from "./cCustomerReducer";
import { cOrderReducer } from "./cOrderReducer";
import { aLoadingReducer } from "state/reducers/aLoadingReducer";
import { ACustomerReducer } from "state/reducers/ACustomerReducer";
import { ASaleReducer } from "state/reducers/ASaleReducer";

export default combineReducers({
  form: formReducer,
  cauth: cAuthReducer,
  ccart: cCartReducer,
  cproduct: cProductReducer,
  aAuth: AAuthReducer,
  aShoes: AShoesReducer,
  aImport: aImportReducer,
  ccustomer: cCustomerReducer,
  corder: cOrderReducer,
  aLoading: aLoadingReducer,
  aCustomer: ACustomerReducer,
  aSale: ASaleReducer,
});
