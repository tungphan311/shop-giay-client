import React from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";

import MultipleForm from "Components/Admin/Form/MultipleForm/MultipleForm";

function AAddShoes() {
  return (
    <div>
      <ABreadcrumb title="Thêm sản phẩm mới" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <MultipleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
const BREADCRUMB = [
  { link: "/admin/shoes", name: "Quản lý giày" },
  { link: "/admin/shoes/add", name: "Thêm mới" },
];

export default AAddShoes;
