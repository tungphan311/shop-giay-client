import React from "react";
import { toast as toaster } from "react-toastify";
import Toaster from "Components/client/CToaster/Toaster";
import { get } from "lodash";

export const stringTruncate = (str, length = 50, ending = "") =>
  str &&
  (length >= str.length
    ? str
    : str.substring(0, length - ending.length) + ending);

export const vietNamCurrency = (value) => {
  const space_every_nr = 3;
  const character = ".";
  let count = 0;
  value = value + "";
  let insert_string = value;
  for (let i = value.length - space_every_nr; i > 0; i -= space_every_nr) {
    insert_string =
      insert_string.substring(0, i) +
      character +
      insert_string.substring(i, value.length + count);
    count++;
  }
  return insert_string + "₫";
};

export function toast({ type = "success", message = "" }) {
  return toaster(<Toaster type={type} message={message} />);
}

export function toastErr(error) {
  let errMsg = get(error, "response.data.msg");

  if (!errMsg) {
    errMsg = "Có lỗi xảy ra";
  }

  toast({ type: "error", message: errMsg });
}


export * from "./Validation";
export * from "./JwtDecoder";
