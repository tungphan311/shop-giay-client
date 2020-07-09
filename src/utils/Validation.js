export function buildErr(errCode, params = {}) {
  return {
    errCode,
    ...params,
  };
}

export const minLength = (min) => (value) => value && value.length >= min;
export const minLength6 = minLength(6);

export const maxLength = (max) => (value) => value && value.length <= max;
export const maxLength18 = maxLength(18);

export const validEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const validDoB = (dob) =>
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/.test(
    dob
  );

export const validYear = (dob) => {
  const year = parseInt(dob.slice(-4));

  return year > 1900 && year < 2021;
};

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

export const password = (value) => {
  if (minLength6(value) && maxLength18(value)) {
    return undefined;
  } else {
    return buildErr("Mật khẩu phải từ 6 đến 18 ký tự");
  }
};

export const email = (value) =>
  validEmail(value) ? undefined : buildErr("Email không hợp lệ");

export const dateOfBirth = (value) =>
  validDoB(value) && validYear(value)
    ? undefined
    : buildErr("Ngày sinh không hợp lệ");

export const phoneNumber = (value) =>
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(
    value
  )
    ? undefined
    : buildErr("Số điện thoại không hợp lệ");
