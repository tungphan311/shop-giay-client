import React from "react";
import { toast as toaster } from "react-toastify";
import Toaster from "Components/client/CToaster/Toaster";

export const stringTruncate = (str, length = 50, ending = "") =>
  str &&
  (length >= str.length
    ? str
    : str.substring(0, length - ending.length) + ending);

export const vietNamCurrency = (value) => {
  // const space_every_nr = 3;
  // const character = ".";
  // let count = 0;
  // value = value + "";
  // let insert_string = value;
  // for (let i = value.length - space_every_nr; i > 0; i -= space_every_nr) {
  //   insert_string =
  //     insert_string.substring(0, i) +
  //     character +
  //     insert_string.substring(i, value.length + count);
  //   count++;
  // }
  // return insert_string + "₫";

  const cur = value.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return cur;
};

export function toast({ type = "success", message = "" }) {
  return toaster(<Toaster type={type} message={message} />);
}

export function toastErr(error) {
  let {
    response: { data },
  } = error;

  let errMsg = data.msg || null;

  if (!errMsg) {
    errMsg = "Có lỗi xảy ra";
  }

  toast({ type: "error", message: errMsg });
}

export function getOrderStatusString(statusCode) {
  switch (statusCode) {
    case 1:
      return "Đang chờ";
    case 2:
      return "Xác nhân";
    case 3:
      return "Đã hủy";
    default:
      return statusCode;
  }
}

export function getPaymentStatusString(paymentStatus) {
  switch (paymentStatus) {
    case 1:
      return "Chưa thanh toán";
    case 2:
      return "Đã thanh toán";
    default:
      return paymentStatus;
  }
}

export * from "./Validation";
export * from "./JwtDecoder";
