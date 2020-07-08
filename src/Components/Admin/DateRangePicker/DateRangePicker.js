import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "./DateRangePicker.scss";
import { DATEPICKER_LOCALE, DATEPICKER_RANGES } from "constants/index";

function ADateRangePicker({ startDate, endDate, handleApply }) {
  return (
    <div style={{ width: "100%" }}>
      <DateRangePicker
        containerStyles={{ width: "100%" }}
        startDate={startDate}
        endDate={endDate}
        locale={DATEPICKER_LOCALE}
        ranges={DATEPICKER_RANGES}
        showCustomRangeLabel={false}
        alwaysShowCalendars={true}
        onApply={(e, picker) => handleApply(e, picker)}
      >
        <div id="reportrange" className="form-control">
          <i className="fa fa-calendar"></i>&nbsp;
          <span className="ml-1 date-result">{`${startDate} - ${endDate}`}</span>{" "}
          <i className="fa fa-caret-down" style={{ float: "right" }}></i>
        </div>
      </DateRangePicker>
    </div>
  );
}

export default ADateRangePicker;
