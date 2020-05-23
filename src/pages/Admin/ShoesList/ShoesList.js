import React, { useEffect, useState } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { GET_SHOES } from "state/reducers/AShoesReducer";

function AShoesList() {
  // create dispatch
  const dispatch = useDispatch();

  // react lifecycle
  useEffect(() => {
    dispatch({ type: GET_SHOES });
  }, []);

  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
    </div>
  );
}

export default AShoesList;

const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];
