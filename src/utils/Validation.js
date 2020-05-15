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
