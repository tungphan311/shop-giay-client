import React, { useEffect, useRef } from "react";
import { toast as toaster } from "react-toastify";
import Toaster from "Components/client/CToaster/Toaster";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const stringTruncate = (str, length = 50, ending = "") =>
  length >= str.length
    ? str
    : str.substring(0, length - ending.length) + ending;

export const vietNamCurrency = (value) => {
  const space_every_nr = 3;
  const character = ".";
  let count = 0;
  let j = 0;
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

export function toastErr(error = "Có lỗi xảy ra") {
  toast({ type: "error", message: error });
}
