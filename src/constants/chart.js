import Highcharts from "highcharts";

export const OPTIONS = {
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
  yAxis: [
    // {
    //   // Primary yAxis
    //   labels: {
    //     format: "{value} người",
    //     style: {
    //       color: Highcharts.getOptions().colors[1],
    //     },
    //   },
    //   title: {
    //     text: "Khách hàng",
    //     style: {
    //       color: Highcharts.getOptions().colors[1],
    //     },
    //   },
    // },
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
    // {
    //   name: "Khách hàng mới",
    //   type: "column",
    //   yAxis: 1,
    //   data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
    //   tooltip: {
    //     valueSuffix: " người",
    //   },
    // },
    // {
    //   name: "Khách hàng quay lại mua hàng",
    //   type: "column",
    //   yAxis: 1,
    //   data: [20, 80, 100, 140, 160, 179, 111, 120, 240, 120, 100, 80],
    //   tooltip: {
    //     valueSuffix: " người",
    //   },
    // },
    {
      name: "Số đơn hàng",
      type: "column",
      data: [40, 70, 100, 120, 140, 170, 130, 140, 210, 190, 90, 50],
      tooltip: {
        valueSuffix: " đơn",
      },
    },
    // {
    //   name: "Doanh thu",
    //   type: "spline",
    //   data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 96],
    //   tooltip: {
    //     valueSuffix: "M",
    //   },
    // },
  ],
};
