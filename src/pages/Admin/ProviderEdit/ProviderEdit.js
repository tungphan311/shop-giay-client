/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import AAddProviderForm from "Components/Admin/Form/AddProvider/AddProvider";
import AErrorPage from "pages/Admin/404Error/Error";
import {
  getProviderByIdAction,
  updateProviderAction,
} from "state/actions/index";
import { toast, toastErr } from "utils/index";

function AProviderEdit({
  match: {
    params: { id },
  },
}) {
  if (isNaN(id)) {
    return <AErrorPage code={404} />;
  }

  const [provider, setProvider] = useState({});
  const dispatch = useDispatch();

  const fetchProvider = () => {
    dispatch(getProviderByIdAction({ id })).then((response) =>
      setProvider(response)
    );
  };
  useEffect(() => {
    fetchProvider();
  }, []);

  const BREADCRUMB = [
    { link: "/admin/provider", name: "Quản lý nhà cung cấp" },
    { link: "/admin/add-provider", name: provider.Name },
  ];

  const handleSubmit = () => {
    dispatch(updateProviderAction({ id: parseInt(id) }))
      .then(() => {
        toast({ message: "Cập nhật thông tin thành công" });
      })
      .catch((err) => toastErr(err));
  };

  return (
    <div>
      <ABreadcrumb title="Thêm sản phẩm mới" list={BREADCRUMB} />
      <AAddProviderForm
        type="edit"
        provider={provider}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AProviderEdit;
