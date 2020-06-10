import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";

import "./AddStock.scss";

import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";
import { GET_COLORS, GET_SIZES } from "state/reducers/AShoesReducer";
import AInput from "Components/Admin/AInput/input";
import { Button } from "react-bootstrap";
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const myCustomInput = ({ getReducer, placeholder, stateName, label }) => (
  <AProviderSelect
    getReducer={getReducer}
    stateName={stateName}
    placeholder={placeholder}
    label={label}
  ></AProviderSelect>
);

const renderMembers = ({ fields }) => (
  <ul className="stockList">
    <Button
      type="button"
      className="Addbtn btn-primary "
      onClick={() => fields.push({})}
    >
      Thêm phiên bản
    </Button>

    {fields.map((member, index) => (
      <li className="stockListEle" key={index}>
        <Button
          className="removeBtn fa fa-trash"
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Phiên bản {index + 1}</h4>
        <div className="displayRow">
          <div className="flex">
            <Field
              name="instock"
              type="text"
              component={AInput}
              placeholder="Số lượng..."
              label="Số lượng"
            ></Field>
          </div>
          <div className="flex mr-2 ml-2">
            <Field
              name="colorId"
              type="text"
              component={myCustomInput}
              getReducer={GET_COLORS}
              placeholder="Chọn màu ..."
              stateName="colors"
              label="Màu"
            />
          </div>
          <div className="flex">
            <Field
              name="sizeId"
              type="text"
              component={myCustomInput}
              getReducer={GET_SIZES}
              placeholder="Chọn size ..."
              stateName="sizes"
              label="Kích cỡ"
            />
          </div>
        </div>
      </li>
    ))}
  </ul>
);

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Thêm phiên bản
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);
class AAddStock extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      previousPage,
    } = this.props;
    return (
      <form className="AddStockForm" onSubmit={handleSubmit}>
        <div className="container">
          <FieldArray name="members" component={renderMembers} />
          <div>
            <button
              className="btn btn-primary btn-border"
              onClick={previousPage}
            >
              Trở về
            </button>
            <button
              type="submit"
              className="btn btn-primary ml-2"
              disabled={submitting}
            >
              Hoàn tất
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Xóa
            </button>
          </div>
        </div>
      </form>
    );
  }
}

AAddStock = reduxForm({
  form: FORM_KEY_ADDSHOES, // a unique identifier for this form
  destroyOnUnmount: false,
  touchOnBlur: false,
})(AAddStock);

export default AAddStock;
