import React from "react";
import WidgetCard from "Components/Admin/Widget/Card";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WidgetCardWithChart from "Components/Admin/Widget/CardWithChart";

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
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
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

function AdminHome() {
  return (
    <div>
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
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <HighchartsReact highcharts={Highcharts} options={options} />
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
