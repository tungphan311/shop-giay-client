import React, { useEffect, useRef } from "react";
import "./Shipping.scss";
import CAddressForm from "Components/client/CAddressForm";
import history from "state/history";
import CButton from "Components/client/CButton";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTION_GET_ADDRESSES,
  ACTION_SHOW_ADDRESS_FORM,
  ACTION_UPDATE_ADDRESS,
} from "state/reducers/cCustomerReducer";
import { change, reset } from "redux-form";
import { ADDRESS_FORM_KEY } from "Components/client/CAddressForm/index";
import { ACTION_SET_ORDER_ADDRESS } from "state/reducers/cOrderReducer";

const CShipping = () => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch({ type: ACTION_UPDATE_ADDRESS });
  };
  useEffect(() => {
    // dispatch({ type: ACTION_GET_ADDRESSES });
    // eslint-disable-next-line
  }, []);

  const addresses = useSelector((state) => state.ccustomer.addresses);
  const isAddressFormDisplay = useSelector(
    (state) => state.ccustomer.addressFormDisplay
  );

  const addressFormRef = useRef(null);

  const setAddressFormData = (data) => {
    dispatch(reset(ADDRESS_FORM_KEY));
    dispatch(change(ADDRESS_FORM_KEY, "id", data.id));
    dispatch(change(ADDRESS_FORM_KEY, "fullName", data.recipientName));
    dispatch(
      change(ADDRESS_FORM_KEY, "phoneNumber", data.recipientPhoneNumber)
    );
    dispatch(change(ADDRESS_FORM_KEY, "street", data.street));
    dispatch(change(ADDRESS_FORM_KEY, "ward", data.ward));
    dispatch(change(ADDRESS_FORM_KEY, "district", data.district));
    dispatch(change(ADDRESS_FORM_KEY, "city", data.city));
  };

  const sendToAddress = (address) => {
    dispatch({ type: ACTION_SET_ORDER_ADDRESS, payload: { data: address } });
    history.push("/checkout/payment");
  };

  return (
    <div className="client-shipping-wrapper">
      <div className="client-shipping-container">
        <div className="checkout-progress">
          <div className="progress-item">
            <div className="progress-label fill-color">Đăng nhập</div>
            <div className="progress-bar-container  fill-full">
              <div className="progress-bar">
                <div className="fill-color" />
              </div>
              <div className="progress-circle">1</div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label fill-color">Địa chỉ giao hàng</div>
            <div className="progress-bar-container fill-half">
              <div className="progress-bar">
                <div className="fill-color"></div>
              </div>
              <div className="progress-circle">2</div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Thanh toán & đặt mua</div>
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
              <div className="progress-circle">3</div>
            </div>
          </div>
        </div>
        <div className="address-list">
          {addresses.map((item, index) => (
            <div key={index} className="address-item">
              <p className="name">{item.recipientName}</p>
              <p className="address">
                {`Địa chỉ: ${item.street}, ${item.ward}, ${item.district}, ${item.city}`}
              </p>
              <p className="phone">Điện thoại: {item.recipientPhoneNumber}</p>
              <div className="action">
                <CButton
                  label="Giao đến địa chỉ này"
                  onClick={() => sendToAddress(item)}
                />
                <CButton
                  label="Sửa"
                  onClick={() => {
                    setAddressFormData(item);
                    dispatch({ type: ACTION_SHOW_ADDRESS_FORM });
                    window.scrollTo({
                      behavior: "smooth",
                      top: addressFormRef.current.offsetBottom,
                    });
                  }}
                  className="edit-address"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="address-addnew">
          Bạn muốn giao hàng đến địa chỉ khác?{" "}
          <span
            onClick={() => {
              dispatch(reset(ADDRESS_FORM_KEY));
              dispatch({ type: ACTION_SHOW_ADDRESS_FORM });
            }}
          >
            Thêm địa chỉ giao hàng mới
          </span>
        </div>
        <div
          ref={addressFormRef}
          className={`address-form-wrapper ${
            isAddressFormDisplay ? "" : "hide"
          }`}
        >
          <CAddressForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CShipping;
