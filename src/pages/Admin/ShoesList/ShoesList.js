import React from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";

function AShoesList() {
  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
    </div>
  );
}

export default AShoesList;

const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];
