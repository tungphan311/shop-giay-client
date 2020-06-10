import React, { Component, Props } from "react";
import { Field, reduxForm, FieldArray, Fields } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import { connect } from "react-redux";
import AInput from "Components/Admin/AInput/input";
import "./AddShoesForm.scss";
import ASelect from "Components/Admin/ASelect/select";
import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";
import ATextArea from "Components/Admin/ATextArea/TextArea";
import AUploadPhoto from "Components/Admin/AUploadPhoTo/UploadPhoto";
import { GET_GENDERS, GET_SHOESTYPES } from "state/reducers/AShoesReducer";

const myCustomInput = ({ getReducer, placeholder, stateName, label }) => (
  <AProviderSelect
    getReducer={getReducer}
    stateName={stateName}
    placeholder={placeholder}
    label={label}
  ></AProviderSelect>
);

class renderPhotoArray extends Component {
  render() {
    let { fields } = this.props;

    return (
      <ul className="photoUploadList">
        {fields.map((image, index) => (
          <li className="photoUploadEle mr-2 ml-2" key={index}>
            <Field name={image} component={AUploadPhoto}></Field>
          </li>
        ))}
      </ul>
    );
  }
}

class AAddShoesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultF: "",
    };
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="AddShoesForm" onSubmit={handleSubmit}>
        <div className="container">
          <span>Hình Ảnh</span>
          <div className="displayCenter" id="style-15">
            <FieldArray name="images" component={renderPhotoArray}></FieldArray>
          </div>
          <div className="displayRow">
            <Field label="Tên" name="name" component={AInput} />
            <Field
              label="Mã giày"
              name="code"
              component={AInput}
              formClassName="ml-2"
            />
            <Field
              label="Giá"
              name="price"
              component={AInput}
              formClassName="ml-2"
            />
          </div>
          <div className="displayRow">
            <Field label="Năm" name="title" component={AInput} />
            <Field
              label="Kiểu"
              name="style"
              type="text"
              getReducer={GET_SHOESTYPES}
              stateName="shoesTypes"
              component={myCustomInput}
              formClassName="ml-2"
            />
            <Field
              label="Thương hiệu"
              name="genderId"
              type="text"
              getReducer={GET_GENDERS}
              stateName="genders"
              component={myCustomInput}
              formClassName="ml-2"
            />
          </div>
          <div className="displayRow">
            <Field
              label="Mô tả"
              type="textarea"
              rows="5"
              name="discription"
              component={ATextArea}
            />
          </div>
          <div style={{ marginLeft: "auto", marginRight: 0 }} className="mt-5">
            <button className="btn btn-primary btn-border">Trở về</button>
            <button type="submit" className="btn btn-primary ml-2">
              Tiếp theo
            </button>
          </div>
        </div>
      </form>
    );
  }
}

AAddShoesForm = reduxForm({
  form: FORM_KEY_ADDSHOES, // a unique identifier for this form
  destroyOnUnmount: false,
  touchOnBlur: false,
})(AAddShoesForm);

export default connect((state) => ({
  initialValues: {
    images: new Array(5).fill(""),
  },
}))(AAddShoesForm);
