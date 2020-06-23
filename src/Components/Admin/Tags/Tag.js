import React from "react";
import "./Tag.scss";
import { Close } from "Components/Admin/Svg/index";

function ATag({ name, value, handleRemoveTag, id, connect = "là" }) {
  return (
    <div className="sg--badges sg--badges--string mr-2 mb-2">
      <div className="sg--badges--body">
        <div className="font-weight-normal d-flex align-items-center">
          <div className="mr-1">{`${name} ${connect} ${value}`}</div>
          <div className="pointer d-flex" onClick={() => handleRemoveTag(id)}>
            <Close />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ATag;
