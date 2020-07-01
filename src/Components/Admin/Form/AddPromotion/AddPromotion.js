import React, { Component } from "react";
import { reduxForm, Field, getFormValues } from "redux-form";
import "./AddPromotion.scss";
import AInput from "Components/Admin/AInput/input";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { FORM_KEY_ADDPROMOTE } from "state/reducers/formReducer";
import { GET_SHOES } from "state/reducers/AShoesReducer";
import ADatePicker from "Components/Admin/DatePicker/DatePicker";
import { requireForm, validDayEx } from "utils/Validation";
import AMultiSelect from "Components/Admin/ProductSelect/MultiSelect";

const getAllShoes = (state) => state.aShoes.shoes;
const getType = (state) => getFormValues(FORM_KEY_ADDPROMOTE)(state)?.saleType || { label: "" }

const mapDispatchToProps = (dispatch) => ({
  getShoes: () => dispatch({ type: GET_SHOES }),
});

const mapStateToProps = (state) => {
  return {
    shoes: getAllShoes(state)
      .filter((s) => !s.IsOnSale)
      .map((ele) => ({
        value: ele.Id,
        label: ele.Name,
      })),
    type: getType(state)
  };
};

class AAddPromoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateMin: new Date(),
    };
  }

  componentDidMount = () => {
    const { getShoes } = this.props;
    getShoes();
  };

  render() {
    const { handleSubmit, shoes, type } = this.props;
    const sales = [
      {
        value: 1,
        label: "%",
      },
      {
        value: 2,
        label: "VNĐ",
      },
    ];

    const { dateMin } = this.state;
    return (
      <form className="AddPromoteForm" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="wrap col-12">
                    <label>Loại Chương Trình Khuyến Mãi</label>
                    <Field
                      isMulti={false}
                      name="saleType"
                      type="text"
                      options={sales}
                      validate={[requireForm]}
                      component={AMultiSelect}
                      placeholder="Chọn Loại Chương Trình Khuyến Mãi"
                    />
                  </div>
                  <div className="col-12">
                    <Field
                      label="Số Lượng"
                      type="text"
                      name="amount"
                      append={type.label}
                      validate={[requireForm]}
                      component={AInput}
                    ></Field>
                  </div>
                  <div className="col-12 pt-3">
                    <label>Sản Phẩm Áp Dụng</label>
                    <Field
                      name="saleProducts"
                      isMulti
                      options={shoes}
                      validate={[requireForm]}
                      component={AMultiSelect}
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
                <div className="col-12">
                  <Field
                    label="Thời Gian Bắt Đầu"
                    name="beginDate"
                    minDate={new Date()}
                    showTimeInput
                    onChange={(e) => this.setState({ dateMin: e })}
                    validate={[requireForm]}
                    component={ADatePicker}
                  ></Field>
                </div>
                <div className="col-12">
                  <Field
                    label="Thời Gian Kết Thúc"
                    name="expiredDate"
                    minDate={dateMin}
                    showTimeInput
                    validate={[requireForm, validDayEx]}
                    component={ADatePicker}
                  ></Field>
                </div>
              </div>
            </div>
            <Button className="btn-primary block" type="submit">
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
})(AAddPromoteForm);

export default connect(mapStateToProps, mapDispatchToProps)(AAddPromoteForm);
