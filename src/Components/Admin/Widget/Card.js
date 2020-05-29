import React from "react";

const TYPES = {
  primary: "card-primary",
  info: "card-info",
  success: "card-success",
  secondary: "card-secondary",
  default: "",
};

function WidgetCard({ title, value, icon, type }) {
  return (
    <div className="col-sm-6 col-md-3">
      <div className={`card card-stats ${TYPES[type]} card-round`}>
        <div className="card-body">
          <div className="row">
            <div className="col-5">
              <div className="icon-big text-center">
                <i className={icon} />
              </div>
            </div>
            <div className="col-7 col-stats">
              <div className="numbers">
                <p className="card-category">{title}</p>
                <h4 className="card-title">{value}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetCard;
