import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import { connect } from "react-redux";
import Input from "Components/Admin/AInput/input";
import "./AddShoesForm.scss";
import Select from "Components/Admin/ASelect/select";

import TextArea from "Components/Admin/ATextArea/TextArea";
import UploadPhoto from "Components/Admin/AUploadPhoTo/UploadPhoto";

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
          <span>Photo</span>
          <div className="displayCenter">
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={UploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={UploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={UploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={UploadPhoto}
            />
            <Field
              label="PhotoUpload"
              name="photoUpload"
              component={UploadPhoto}
            />
          </div>
          <div className="displayRow">
            <Field label="Name" name="name" component={Input} />
            <Field label="Code" name="code" component={Input} />
          </div>
          <div className="displayRow">
            <Field label="Year" name="title" component={Input} />
            <Field label="Style" name="style" component={Select} />
            <Field label="Brand" name="brand" component={Select} />
          </div>
          <div className="displayRow">
            <Field
              label="Description"
              type="textarea"
              rows="5"
              name="discription"
              component={TextArea}
            />
            <Field label="Price" name="price" component={Input} />
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
