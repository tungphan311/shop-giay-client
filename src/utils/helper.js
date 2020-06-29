import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const formatDateToString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${formatDateNumber(day)}${formatDateNumber(month)}${formatDateNumber(
    year
  )}`;
};

export const formatDateTime = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const mins = date.getMinutes();

  return `${formatDateNumber(day)}/${formatDateNumber(
    month
  )}/${formatDateNumber(year)} ${formatDateNumber(hour)}:${formatDateNumber(
    mins
  )}`;
};

export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${formatDateNumber(day)}/${formatDateNumber(
    month
  )}/${formatDateNumber(year)}`;
};

export const formatDateNumber = (num) => (num > 9 ? String(num) : `0${num}`);

export const convertArrayOfObjectsToCSV = (array) => {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    console.log(item);
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      if (typeof item[key] === "object") {
        let json = JSON.stringify(item[key]);
        json = json.replace(/[ ]*,[ ]*|[ ]+/g, " | ");
        result += json;
      } else {
        result += item[key];
      }

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

export const downloadCSV = (arr, title) => {
  const link = document.createElement("a");

  let csv = convertArrayOfObjectsToCSV(arr);
  if (!csv) return;

  const date = formatDateToString(new Date());
  const fileName = `${title}-${date}.csv`;
  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", fileName);
  link.click();
};

export const downloadExcel = (arr, title) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const date = formatDateToString(new Date());
  const fileName = `${title}-${date}`;

  const ws = XLSX.utils.json_to_sheet(arr);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
