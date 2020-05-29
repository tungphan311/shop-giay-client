import React from "react";
import WidgetCard from "Components/Admin/Widget/Card";

function AdminHome() {
  return (
    <div>
      <WidgetCard
        title="Lượt truy cập"
        value={Intl.NumberFormat().format(1294)}
        icon="flaticon-users"
        type="primary"
      />
    </div>
  );
}

export default AdminHome;
