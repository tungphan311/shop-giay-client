import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function WidgetCardWithChart({ suffix, name, title, percent, amount, data }) {
  const options = {
    chart: {
      zoomType: "xy",
      height: 100,
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      marker: {
        radius: 4,
        states: {
          hover: {
            radius: 5,
          },
        },
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: `{value} ${suffix}`,
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
        visible: false,
      },
    ],
    series: [
      {
        name: "",
        type: "line",
        showInLegend: false,
        data,
        tooltip: {
          valueSuffix: `${suffix}`,
        },
      },
    ],
  };

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body pb-0">
          <div className="h1 fw-bold float-right text-primary">{`${percent}%`}</div>
          <h2 className="mb-2">{amount}</h2>
          <p className="text-muted">{title}</p>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
}

export default WidgetCardWithChart;
