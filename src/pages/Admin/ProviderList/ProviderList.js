import React, { useState, useEffect, useCallback, useMemo } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import DataTable from "react-data-table-component";
import { customStyles } from "constants/index";
import { OPTIONS, NoDataComponent } from "utils/utils";
import APagination from "Components/Admin/Pagination/Pagination";
import history from "state/history";
import { useDispatch } from "react-redux";
import { getProviderAction, deleteProviderAction } from "state/actions/index";
import qs from "query-string";
import swal from "sweetalert";
import { toastErr } from "utils/index";

function AProviderList({ location: { search } }) {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const dispatch = useDispatch();

  const mapResponseToData = (res) => {
    return res.map((s) => ({
      id: s.Id,
      name: s.Name,
      address: s.Address,
      email: s.Email,
      phoneNumber: s.PhoneNumber,
      TIN: s.TIN,
    }));
  };

  const fetchProvider = (page, pageSize) => {
    const query = qs.stringify({ page, "page-size": pageSize });
    history.push(`?${query}`);

    dispatch(getProviderAction({ page, pageSize }))
      .then(({ response, total }) => {
        console.log(response);
        const newData = mapResponseToData(response);
        setData(newData);
        setTotalRows(total);
      })
      .catch((err) => toastErr(err));
  };

  useEffect(() => {
    const parsed = qs.parse(search);
    let { page, "page-size": pageSize } = parsed;

    page = page || 1;
    pageSize = pageSize || 10;

    fetchProvider(page, pageSize);
  }, []);

  const columns = [
    {
      name: "Nhà cung cấp",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div
          className="cell--info"
          onClick={() => history.push(`/admin/provider/${row.id}`)}
        >
          {row.name}
        </div>
      ),
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      center: true,
      maxWidth: "200px",
    },
    {
      name: "Địa chỉ",
      selector: "address",
      sortable: true,
      center: true,
    },
    {
      name: "Số điện thoại",
      selector: "phoneNumber",
      sortable: true,
      center: true,
      maxWidth: "200px",
    },
    {
      name: "Mã số thuế",
      selector: "TIN",
      sortable: true,
      center: true,
      maxWidth: "150px",
    },
  ];

  const handlePageChange = (page) => {
    const search = qs.stringify({ page, "page-size": pageSize });
    history.push(`?${search}`);

    setPage(page);
    fetchProvider(page, pageSize);
  };

  const handlePerPageChange = (event) => {
    const pageSize = event.target.value;

    const search = qs.stringify({ page: 1, "page-size": pageSize });
    history.push(`?${search}`);

    setPageSize(pageSize);
    setPage(1);
    fetchProvider(1, pageSize);
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const actions = (
    <>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/admin/add-provider")}
      >
        Thêm mới
      </button>
    </>
  );

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      swal({
        title: "Bạn có chắc không?",
        text: "Một khi xoá, bạn không thể khôi phục những dòng đã chọn!",
        icon: "warning",
        buttons: ["Huỷ", "Xoá"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const ids = selectedRows.map((s) => s.id);

            dispatch(deleteProviderAction(ids)).then(() => {
              swal("Chúc mừng bạn đã xoá thành công", {
                icon: "success",
              });
              setData(data.filter((x) => !selectedRows.includes(x)));
              setToggleCleared(!toggleCleared);
            });
          } else {
            setToggleCleared(!toggleCleared);
            swal("Chúc mừng dữ liệu của bạn vẫn an toàn!");
          }
        })
        .catch((err) => toastErr(err));
    };

    return (
      <button
        onClick={handleDelete}
        className="btn btn-icon btn-round btn-danger"
      >
        <i className="fa fa-trash" />
      </button>
    );
  }, [data, selectedRows, toggleCleared]);

  return (
    <div>
      <ABreadcrumb title="Danh sách khách hàng" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-4">
            <DataTable
              title="Danh sách nhà cung cấp"
              customStyles={customStyles}
              columns={columns}
              data={data}
              actions={actions}
              contextActions={contextActions}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent={<NoDataComponent title="nhà cung cấp" />}
              paginationComponent={() => (
                <APagination
                  page={page}
                  handlePageChange={(page) => handlePageChange(page)}
                  totalRows={10}
                  perPage={pageSize}
                  pageSizes={[10, 15, 20, 25]}
                  handlePerPageChange={handlePerPageChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AProviderList;

const BREADCRUMB = [
  { link: "/admin/providers", name: "Danh sách nhà cung cấp" },
];
