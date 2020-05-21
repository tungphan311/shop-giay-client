import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import { connect } from "react-redux";
import AInput from "Components/Admin/AInput/input";
import "./AddShoesForm.scss";
import ASelect from "Components/Admin/ASelect/select";

import ATextArea from "Components/Admin/ATextArea/TextArea";
import AUploadPhoto from "Components/Admin/AUploadPhoTo/UploadPhoto";

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
          <div className="displayCenter">
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={AUploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={AUploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={AUploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={AUploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={AUploadPhoto}
            />
          </div>
          <div className="displayRow">
            <Field label="Tên" name="name" component={AInput} />
            <Field label="Mã giày" name="code" component={AInput} />
          </div>
          <div className="displayRow">
            <Field label="Năm" name="title" component={AInput} />
            <Field label="Kiểu" name="style" component={ASelect} />
            <Field label="Thương hiệu" name="brand" component={ASelect} />
          </div>
          <div className="displayRow">
            <Field
              label="Mô tả"
              type="textarea"
              rows="5"
              name="discription"
              component={ATextArea}
            />
            <Field label="Giá" name="price" component={AInput} />
          </div>
        </div>
      </form>
    );
  }
}
AAddShoesForm = reduxForm({
  form: FORM_KEY_ADDSHOES, // a unique identifier for this form
  touchOnBlur: false,
})(AAddShoesForm);

export default connect((state) => ({
  initialValues: {
    // name: getCourseNameSelector(state),
  },
}))(AAddShoesForm);
