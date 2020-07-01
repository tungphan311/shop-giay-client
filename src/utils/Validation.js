export function buildErr(errCode, params = {}) {
  return {
    errCode,
    ...params,
  };
}

export const required = (value) => value;
export const require = (value) =>
  required(value)
    ? undefined
    : buildErr("Đây là trường bắt buộc, vui lòng không bỏ trống");

export const requireForm = (value) =>
  required(value) ? undefined : buildErr("Không được bỏ trống");

export const validDayEx = (value, allValues) =>
  value < allValues.beginDate ? buildErr("Ngày không hợp lệ") : undefined;

export const floatNumber = (value) =>
  /^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value);
export const validFloatNumber = (value) =>
  floatNumber(value) ? undefined : buildErr("Giá trị không hợp lệ");
