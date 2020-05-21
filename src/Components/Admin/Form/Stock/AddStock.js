import React from "react";
import { reduxForm } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";

function AAddStock({ handleSubmit, previousPage }) {
  return (
    <form className="AddShoesForm" onSubmit={handleSubmit}>
      <div className="container">
        <div>assd</div>
        <div style={{ marginLeft: "auto", marginRight: 0 }} className="mt-5">
          <button className="btn btn-primary btn-border" onClick={previousPage}>
            Trở về
          </button>
          <button type="submit" className="btn btn-primary ml-2">
            Hoàn tất
          </button>
        </div>
      </div>
    </form>
  );
}

AAddStock = reduxForm({
  form: FORM_KEY_ADDSHOES, // a unique identifier for this form
  destroyOnUnmount: false,
  touchOnBlur: false,
})(AAddStock);

export default AAddStock;
