import { reduxForm, Field, getFormValues, change } from "redux-form";
import React from "react";
import CButton from "Components/client/CButton";
import CInput from "../CInput";
import { require } from "utils/index";
import CSelect from "../CSelect";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CTextarea from "../CTextarea/index";
import { ACTION_HIDE_ADDRESS_FORM } from "state/reducers/cCustomerReducer";
import { CITY_LIST } from "constants/index";

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
    setCityList(
      CITY_LIST.map((city) => ({ value: city.name, label: city.name }))
    );
    // cGetCityList().then((res) => {
    //   const {
    //     data: { LtsItem },
    //   } = res;
    //   setCityList(
    //     LtsItem.map((item) => ({
    //       value: item.ID,
    //       label: item.Title,
    //     }))
    //   );
    // });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setDistrictList(
        CITY_LIST.find(
          (x) => x.name === selectedCity.value
        )?.districts.map((x) => ({ value: x.name, label: x.name })) || []
      );
    } else {
      setDistrictList([]);
      dispatch(change(ADDRESS_FORM_KEY, "district", null));
    }
    // if (selectedCity && selectedCity.value) {
    //   cGetDistrictList(selectedCity.value).then((res) => {
    //     const { data } = res;
    //     setDistrictList(() => {
    //       return data.map((item) => ({
    //         value: item.ID,
    //         label: item.Title,
    //       }));
    //     });
    //   });
    // } else {
    //   setDistrictList([]);
    // }
    // if (typeof selectedDistrict === "object")
    //   dispatch(change(ADDRESS_FORM_KEY, "district", null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      setWardList(
        CITY_LIST.find((x) => x.name === selectedCity.value)
          ?.districts.find((y) => y.name === selectedDistrict.value)
          ?.wards.map((z) => ({ value: z, label: z })) || []
      );
    } else {
      setWardList([]);
      dispatch(change(ADDRESS_FORM_KEY, "ward", null));
    }
    // if (selectedDistrict && selectedDistrict.value) {
    //   cGetWardList(selectedDistrict.value).then((res) => {
    //     const { data } = res;
    //     setWardList(
    //       data.map((item) => ({
    //         value: item.ID,
    //         label: item.Title,
    //       }))
    //     );
    //   });
    // } else {
    //   setWardList([]);
    // }
    // if (typeof selectedWard === "object")
    //   dispatch(change(ADDRESS_FORM_KEY, "ward", null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        name="street"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ"
      />
      <div className="button-container">
        <CButton
          className="cancel-button"
          onClick={() => {
            dispatch({ type: ACTION_HIDE_ADDRESS_FORM });
          }}
          label="Hủy bỏ"
        />
        <CButton className="submit-button" type="submit" label="Cập nhật" />
      </div>
    </form>
  );
}

export default reduxForm({
  form: ADDRESS_FORM_KEY,
  destroyOnUnmount: false,
})(CAddressForm);
