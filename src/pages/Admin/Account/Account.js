import React, { useState, useEffect } from "react";
import { customStyles } from "constants/index";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import APagination from "Components/Admin/Pagination/Pagination";
import DataTable from "react-data-table-component";
import history from "state/history";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import "./Account.scss";
// import { getAllAccountAction } from "state/actions/index";
import { toastErr } from "utils/index";

// import AAddPromoteForm from "Components/Admin/Form/AddPromotion/AddPromotion";

import { OPTIONS, NoDataComponent } from "utils/utils";
import { GET_ALL_ACCOUNT } from "state/reducers/AAccount";
const SELECT = "select";
const VALUE = "value";

function AAccount() {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [fetch, setFetch] = useState(false);

  const accounts = useSelector((state) => state.aAccount.accounts);

  const mapResponseToData = (res) => {
    return res.map((s) => ({
      id: s.Id,
      name: s.Name,
      phoneNumber: s.PhoneNumber,
      userName: s.Username,
      email: s.Email,
      role: s.RoleId === 1 ? "Nhân viên" : "Quản lý",
    }));
  };

  useEffect(() => {
    if (accounts.length) {
      setData(mapResponseToData(accounts));
    } else {
      dispatch({ type: GET_ALL_ACCOUNT });
    }
  }, [accounts, dispatch]);

  const actions = (
    <>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/admin/account/add")}
      >
        Thêm tài khoản
      </button>
    </>
  );
  const columns = [
    {
      name: "Họ và tên",
      selector: "name",
      sortable: true,
    },
    {
      name: "Chức vụ",
      selector: "role",
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      center: true,
    },
    {
      name: "Số điện thoại",
      selector: "phoneNumber",
      sortable: true,
      center: true,
      maxWidth: "20 0px",
    },
    {
      name: "Tài khoản",
      selector: "userName",
      sortable: true,
      center: true,
      maxWidth: "150px",
    },
  ];

  return (
    <div>
      <ABreadcrumb title="Danh sách tài khoản" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-4">
            <DataTable
              title="Danh sách giày nhập mới"
              customStyles={customStyles}
              columns={columns}
              data={data}
              selectableRows
              actions={actions}
              pagination
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent="Danh sách hiện tại còn trống"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AAccount;

const BREADCRUMB = [{ link: "/admin/account", name: "Danh sách tài khoản" }];
