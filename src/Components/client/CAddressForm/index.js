import { reduxForm, Field, change, getFormValues } from "redux-form";
import React from "react";
import CButton from "Components/client/CButton";
import CInput from "../CInput";
import { require } from "utils/index";
import CSelect from "../CSelect";
import { useState, useEffect } from "react";
import {
  cGetCityList,
  cGetDistrictList,
  cGetWardList,
} from "services/cOrderService";
import { useSelector, useDispatch } from "react-redux";
import CTextarea from "../CTextarea/index";

export const ADDRESS_FORM_KEY = "FORM/ADDRESS";

function CAddressForm({ handleSubmit }) {
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const selectedCity = useSelector(
    (state) => getFormValues(ADDRESS_FORM_KEY)(state)?.city
  );
  const selectedDistrict = useSelector(
    (state) => getFormValues(ADDRESS_FORM_KEY)(state)?.district
  );
  const dispatch = useDispatch();
  useEffect(() => {
    cGetCityList().then((res) => {
      const {
        data: { LtsItem },
      } = res;
      setCityList(
        LtsItem.map((item) => ({
          value: item.ID,
          label: item.Title,
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      cGetDistrictList(selectedCity.value).then((res) => {
        const { data } = res;
        console.log(data);
        setDistrictList(
          data.map((item) => ({
            value: item.ID,
            label: item.Title,
          }))
        );
      });
    } else {
      setDistrictList([]);
    }
    dispatch(change(ADDRESS_FORM_KEY, "district", null));
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      cGetWardList(selectedDistrict.value).then((res) => {
        const { data } = res;
        console.log(data);
        setWardList(
          data.map((item) => ({
            value: item.ID,
            label: item.Title,
          }))
        );
      });
    } else {
      setWardList([]);
    }
    dispatch(change(ADDRESS_FORM_KEY, "ward", null));
  }, [selectedDistrict]);

  return (
    <form onSubmit={handleSubmit} className="address-form-container" noValidate>
      <Field
        component={CInput}
        validate={[require]}
        name="fullName"
        label="Họ tên"
        placeholder="Nhập họ tên"
      />
      <Field
        component={CInput}
        validate={[require]}
        name="phoneNumber"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
      />
      <Field
        component={CSelect}
        validate={[require]}
        name="city"
        formName={ADDRESS_FORM_KEY}
        label="Tỉnh/Thành phố"
        options={cityList}
        placeholder="Chọn tỉnh/thành phố"
        isLoading={cityList.length === 0}
      />
      <Field
        component={CSelect}
        validate={[require]}
        name="district"
        formName={ADDRESS_FORM_KEY}
        label="Quận/Huyện"
        options={districtList}
        placeholder="Chọn quận/huyện"
        isLoading={districtList.length === 0}
      />
      <Field
        component={CSelect}
        validate={[require]}
        name="ward"
        formName={ADDRESS_FORM_KEY}
        label="Phường/xã"
        options={wardList}
        placeholder="Chọn phường/xã"
        isLoading={wardList.length === 0}
      />
      <Field
        component={CTextarea}
        validate={[require]}
        name="address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ"
      />
      <CButton
        className="submit-button"
        type="submit"
        label="Giao đến địa chỉ này"
      />
    </form>
  );
}

export default reduxForm({
  form: ADDRESS_FORM_KEY,
  destroyOnUnmount: false,
})(CAddressForm);
