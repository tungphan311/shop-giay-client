import React, { useEffect, useState } from "react";
import WidgetCard from "Components/Admin/Widget/Card";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WidgetCardWithChart from "Components/Admin/Widget/CardWithChart";
import ADateRangePicker from "Components/Admin/DateRangePicker/DateRangePicker";
import moment from "moment";
import AProductSelect from "Components/Admin/ProductSelect/Select";
import "./AdminHome.scss";
import { NoData } from "Components/Admin/Svg/index";
import { useDispatch } from "react-redux";
import { getReportAction } from "state/actions/index";

const options = {
  chart: {
    zoomType: "xy",
  },
  title: {
    text: "Thống kê tình hình doanh thu",
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    shared: true,
  },
  legend: {
    layout: "horizontal",
    align: "center",
  },
  xAxis: [
    {
      categories: [
        "Jan",
        "",
        "Mar",
        "Apr",
        "May",
        "",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "",
        "Dec",
      ],
      // crosshair: true,
    },
  ],
  yAxis: [
    {
      // Primary yAxis
      labels: {
        format: "{value} người",
        style: {
          color: Highcharts.getOptions().colors[1],
        },
      },
      title: {
        text: "Khách hàng",
        style: {
          color: Highcharts.getOptions().colors[1],
        },
      },
    },
    {
      // Secondary yAxis
      title: {
        text: "Số lượng đơn hàng",
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      labels: {
        format: "{value} đơn",
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      opposite: true,
    },
  ],
  series: [
    {
      name: "Khách hàng mới",
      type: "column",
      yAxis: 1,
      data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
      tooltip: {
        valueSuffix: " người",
      },
    },
    {
      name: "Khách hàng quay lại mua hàng",
      type: "column",
      yAxis: 1,
      data: [20, 80, 100, 140, 160, 179, 111, 120, 240, 120, 100, 80],
      tooltip: {
        valueSuffix: " người",
      },
    },
    {
      name: "Số đơn hàng",
      type: "column",
      yAxis: 1,
      data: [40, 70, 100, 120, 140, 170, 130, 140, 210, 190, 90, 50],
      tooltip: {
        valueSuffix: " đơn",
      },
    },
    {
      name: "Doanh thu",
      type: "spline",
      data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 96],
      tooltip: {
        valueSuffix: "M",
      },
    },
    // {
    //   name: "Số "
    // }
  ],
};

const START = moment().subtract(6, "days");
const END = moment();

const TARGET = [
  { value: 1, label: "Doanh thu" },
  { value: 2, label: "Đơn hàng" },
  { value: 3, label: "Khách hàng" },
];

function AdminHome() {
  const [startDate, setStartDate] = useState(START.format("MM/DD/YYYY"));
  const [endDate, setEndDate] = useState(END.format("MM/DD/YYYY"));
  const [start, setStart] = useState(START.format("YYYY-MM-DD"));
  const [end, setEnd] = useState(END.format("YYYY-MM-DD"));
  const [target, setTarget] = useState(TARGET[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getReportAction({ startDate: start, endDate: end, target: target.value })
    );
  }, []);

  const handleApplyDatepicker = (e, picker) => {
    setStartDate(picker.startDate.format("MM/DD/YYYY"));
    setEndDate(picker.endDate.format("MM/DD/YYYY"));
    setStart(picker.startDate.format("YYYY-MM-DD"));
    setEnd(picker.endDate.format("YYYY-MM-DD"));
  };

  const handleUpdate = () => {
    dispatch(
      getReportAction({ startDate: start, endDate: end, target: target.value })
    );
  };

  return (
    <div className="admin-home--wrapper">
      <div className="row">
        <WidgetCard
          title="Lượt truy cập"
          value={Intl.NumberFormat().format(1294)}
          icon="flaticon-users"
          type="primary"
        />
        <WidgetCard
          title="Đăng ký nhận tin"
          value={Intl.NumberFormat().format(200)}
          icon="flaticon-interface-6"
          type="info"
        />
        <WidgetCard
          title="Đơn hàng"
          value={Intl.NumberFormat().format(600)}
          icon="flaticon-success"
          type="secondary"
        />
        <WidgetCard
          title="Doanh thu"
          value={Intl.NumberFormat().format(100000000)}
          icon="flaticon-analytics"
          type="success"
        />
      </div>
      <div className="row">
        <WidgetCardWithChart
          suffix="người"
          name="Khách hàng mới tuần qua"
          title="Khách hàng mới tháng này"
          percent={5}
          amount={20}
          data={data}
        />
      </div>
      <div className="row" style={{ marginBottom: "16px" }}>
        <div className="col-12">
          <div className="row align-items-end">
            <div className="col-12 col-sm-8">
              <div className="d-flex flex-wrap justify-content-start">
                <div className="general-time mr-2">
                  <p>Thời gian</p>
                  <ADateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    handleApply={handleApplyDatepicker}
                  />
                </div>
                <div className="general-target">
                  <p>Đối tượng</p>
                  <AProductSelect
                    options={TARGET}
                    selectedOption={target}
                    onChange={(select) => setTarget(select)}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="general-refresh">
                <p className="mb-0 mr-2">
                  đã cập nhật <strong>1 phút trước</strong>{" "}
                </p>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-lg-8 d-flex flex-column">
                  <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column">
                  <div className="pb-3">
                    <p className="general-title">Sản phẩm bán chạy</p>
                  </div>
                  <div className="general-bestsale--nodata">
                    <div className="text-center">
                      <NoData />
                      <p className="mb-0 text-center text-secondary">
                        Không có sản phẩm bán chạy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

const data = [
  { name: "01/06/2020", y: 70 },
  { name: "02/06/2020", y: 69 },
  { name: "03/06/2020", y: 95 },
  { name: "04/06/2020", y: 30 },
  { name: "05/06/2020", y: 20 },
  { name: "06/06/2020", y: 40 },
  { name: "07/06/2020", y: 35 },
];
