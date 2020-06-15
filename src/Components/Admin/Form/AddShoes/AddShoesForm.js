import React, { Component, Props } from "react";
import { Field, reduxForm, FieldArray, Fields } from "redux-form";
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
  enableReinitialize: true,
})(AAddShoesForm);

export default connect((state) => {
  const data = state.aShoes.shoesEdit;
  const temp = new Array(5).fill("");
  if (data) {
    switch (data.GenderId) {
      case 1: {
        data.GenderId = {
          value: 1,
          label: "Unisex",
        };
        break;
      }
      case 2: {
        data.GenderId = {
          value: 2,
          label: "Female",
        };
        break;
      }
      case 3: {
        data.GenderId = {
          value: 3,
          label: "Male",
        };
        break;
      }
      default:
        break;
    }
    data.ShoesImages = [...data.ShoesImages, ...temp].slice(0, 5);
  }
  return state.aShoes.shoesEdit
    ? {
        initialValues: {
          images: data.ShoesImages.map((ele) =>
            ele.ImagePath ? ele.ImagePath : ""
          ),
          stocks: data.Stocks.map((ele) => ({
            instock: ele.Instock,
          })),
          name: data.Name,
          code: data.Code,
          price: data.Price,
          genderId: data.GenderId,
          description: data.Description || "",
        },
      }
    : {
        initialValues: {
          images: new Array(5).fill(""),
        },
      };
})(AAddShoesForm);