import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import { connect } from "react-redux";
import AInput from "Components/Admin/AInput/input";
import "./AddShoesForm.scss";
import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";
import ATextArea from "Components/Admin/ATextArea/TextArea";
import AUploadPhoto from "Components/Admin/AUploadPhoTo/UploadPhoto";
import {
  GET_GENDERS,
  GET_SHOESTYPES,
  GET_SHOESBRANDS,
} from "state/reducers/AShoesReducer";
import { requireForm } from "utils/index";

const formatData = (data) => {
  const newData = {
    label: data.Name,
    value: data.Id,
  };
  return newData;
};

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
            <Field
              label="Tên"
              validate={[requireForm]}
              name="name"
              component={AInput}
            />
            <Field
              label="Mã giày"
              name="code"
              validate={[requireForm]}
              component={AInput}
              formClassName="ml-2"
            />
            <Field
              label="Giá"
              name="price"
              validate={[requireForm]}
              component={AInput}
              formClassName="ml-2"
            />
          </div>
          <div className="displayRow">
            <div className="flex">
              <Field
                label="Giới tính"
                name="genderId"
                type="text"
                getReducer={GET_GENDERS}
                stateName="genders"
                component={myCustomInput}
                formClassName="ml-2"
                placeholder="Chọn giới tính..."
              />
            </div>
            <div className="flex mr-2 ml-2">
              <Field
                label="Kiểu"
                name="styleId"
                type="text"
                getReducer={GET_SHOESTYPES}
                stateName="shoesTypes"
                component={myCustomInput}
                formClassName="ml-2"
                placeholder="Chọn kiểu giày..."
              />
            </div>
            <div className="flex">
              <Field
                label="Thương hiệu"
                name="brandId"
                type="text"
                getReducer={GET_SHOESBRANDS}
                stateName="shoesBrands"
                component={myCustomInput}
                formClassName="ml-2"
                placeholder="Chọn thương hiệu"
              />
            </div>
          </div>
          <div className="displayRow">
            <Field
              label="Mô tả"
              type="textarea"
              rows="5"
              name="description"
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
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(AAddShoesForm);

export default connect((state, props) => {
  const { type } = props;
  if (type === "add") return {};
  const data = state.aShoes.shoesEdit;
  const temp = new Array(5).fill("");

  data.ShoesImages =
    data.ShoesImages && [...data.ShoesImages, ...temp].slice(0, 5);

  return {
    initialValues: {
      images:
        (data.ShoesImages &&
          data.ShoesImages.map((ele) =>
            ele.ImagePath ? ele.ImagePath : ""
          )) ||
        new Array(5).fill(""),
      name: data.Name,
      code: data.Code,
      price: data.Price,
      genderId: data.Gender && {
        value: data.Gender.Id,
        label: data.Gender.Name,
      },
      styleId: data.ShoesType && {
        value: data.ShoesType.Id,
        label: data.ShoesType.Name,
      },
      brandId: data.ShoesBrand && {
        value: data.ShoesBrand.Id,
        label: data.ShoesBrand.Name,
      },
      description: data.Description || "",
      stocks:
        data.Stocks &&
        data.Stocks.map((ele) => ({
          instock: ele.Instock,
          id: ele.Id,
          colorId:
            state.aShoes.colors.find((e) => e.Id === ele.ColorId) &&
            formatData(state.aShoes.colors.find((e) => e.Id === ele.ColorId)),
          sizeId:
            state.aShoes.sizes.find((e) => e.Id === ele.SizeId) &&
            formatData(state.aShoes.sizes.find((e) => e.Id === ele.SizeId)),
        })),
    },
  };
}, null)(AAddShoesForm);
