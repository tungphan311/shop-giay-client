import React, { useState } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import AAddProviderForm from "Components/Admin/Form/AddProvider/AddProvider";
import { useDispatch } from "react-redux";
import { addProviderAction } from "state/actions/index";
import { reset } from "redux-form";
import { FORM_KEY_ADD_PROVIDER } from "state/reducers/formReducer";

function AAddProvider() {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addProviderAction()).then(() => {
      dispatch(reset(FORM_KEY_ADD_PROVIDER));
    });
  };

  return (
    <div>
      <ABreadcrumb title="Thêm sản phẩm mới" list={BREADCRUMB} />
      <AAddProviderForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AAddProvider;

const BREADCRUMB = [
  { link: "/admin/provider", name: "Quản lý nhà cung cấp" },
  { link: "/admin/add-provider", name: "Thêm mới" },
];
