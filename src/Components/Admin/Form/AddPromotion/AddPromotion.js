import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";

import "./AddPromotion.scss";
import AInput from "Components/Admin/AInput/input";
import { Button } from "react-bootstrap";
import { FORM_KEY_ADDPROMOTE } from "state/reducers/formReducer";
import { GET_COLORS, GET_SIZES } from "state/reducers/AShoesReducer";
import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";
import ADatePicker from "Components/Admin/DatePicker/DatePicker";
const myCustomInput = ({
  input,
  getReducer,
  placeholder,
  stateName,
  label,
}) => (
  <AProviderSelect
    {...input}
    getReducer={getReducer}
    stateName={stateName}
    placeholder={placeholder}
    label={label}
    selected={input.value}
    setSelected={input.onChange}
  ></AProviderSelect>
);

class AAddPromoteForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="AddPromoteForm" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="card">
              <div className="card-body">
                <Field
                  label="Tên Chương Trình Khuyến Mãi"
                  type="text"
                  name="name"
                  component={AInput}
                ></Field>
                <div className="row">
                  <div className="wrap ">
                    <Field
                      label="Loại Chương Trình Khuyến Mãi"
                      name="colorId"
                      type="text"
                      getReducer={GET_COLORS}
                      stateName="colors"
                      component={myCustomInput}
                      formClassName="ml-2"
                      placeholder="Chọn Loại Chương Trình Khuyến Mãi"
                    />
                  </div>
                  <div className="wrap">
                    <Field
                      label="Mức Giảm"
                      append="Đ"
                      name="asv"
                      component={AInput}
                    ></Field>
                  </div>
                </div>
                <div className="row">
                  <div className="wrap">
                    <Field
                      label="Áp Dụng Cho"
                      name="apdung"
                      type="text"
                      getReducer={GET_COLORS}
                      stateName="colors"
                      component={myCustomInput}
                      formClassName="ml-2"
                      placeholder=""
                    />
                  </div>
                  <div className="wrap">
                    <Field
                      label="Áp dụng"
                      name="apdung"
                      type="text"
                      getReducer={GET_COLORS}
                      stateName="colors"
                      component={myCustomInput}
                      formClassName="ml-2"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="wrap">
                    <Field
                      label="Loại Chương Trình Khuyến Mãi"
                      name="colorId"
                      type="text"
                      getReducer={GET_COLORS}
                      stateName="colors"
                      component={myCustomInput}
                      formClassName="ml-2"
                      placeholder="Chọn Loại Chương Trình Khuyến Mãi"
                    />
                  </div>
                  <div className="wrap">
                    <Field
                      label="Mức Giảm"
                      append="Đ"
                      name="asv"
                      component={AInput}
                    ></Field>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Thời Hạn Sử Dụng</div>
                <div>
                  <Field
                    label="Thời Gian Bắt Đầu"
                    name="ngaybd"
                    component={ADatePicker}
                  ></Field>
                </div>
                <div>
                  <Field
                    label="Thời Gian Kết Thúc"
                    name="ngaybd"
                    component={ADatePicker}
                  ></Field>
                </div>
                <div>
                  <div>
                    <Field
                      name="employed"
                      id="employed"
                      component="input"
                      type="checkbox"
                    />
                    <span>Không bao giờ hết hạn</span>
                  </div>
                </div>
              </div>
            </div>
            <Button className="btn-primary block" type="button">
              Lưu
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

AAddPromoteForm = reduxForm({
  form: FORM_KEY_ADDPROMOTE, // a unique identifier for this form
  destroyOnUnmount: false,
  touchOnBlur: false,
  keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
})(AAddPromoteForm);

export default AAddPromoteForm;
