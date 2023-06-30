export const Add_Assigment = async (args) => {
  const data = JSON.stringify({
    e_id: args.e_id,
    range_start: args.rangeStart,
    range_end: args.rangeEnd,
    date: args.date,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };
  const response = await fetch(
    `http://localhost:3001/EmployeeResourcesAPI/addAssignment`,
    options
  );

  return await response.json();
};

export const GET_Preview = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  const url_end =
    args.shiftOption == "end"
      ? "EmployeeResourcesAPI/PreviewTansformEndShift"
      : "EmployeeResourcesAPI/PreviewTansformStartShift";
  const data = JSON.stringify({
    e_id: args.e_id,
    date: args.date,
    hours: args.hours,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };
  const response = await fetch(`http://localhost:3001/${url_end}`, options);
  const responseData = await response.json();
  return responseData;
};

export const transform_shift = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  const url_end =
    args.shiftOption == "end"
      ? "/EmployeeResourcesAPI/TansformEndShift"
      : "/EmployeeResourcesAPI/TansformStartShift";
  const data = JSON.stringify({
    e_id: args.e_id,
    date: args.date,
    hours: args.hours,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };

  const response = await fetch(`http://localhost:3001${url_end}`, options);
  const responseData = await response.json();
  return responseData;
};

export const pdf_get = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}

  const url_end =
    args.e_id == "PRINT_ALL"
      ? "/EmployeeResourcesAPI/Generate_Time_sheet_all"
      : "/EmployeeResourcesAPI/Generate_Time_sheet";
  const data = JSON.stringify({
    employee_id: args.e_id,
    shift_start_range: args.date1,
    shift_end_range: args.date2,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };

  const response = await fetch(`http://localhost:3001${url_end}`, options);
  return response.blob();
};

const removeShift = async (args) => {
  //args = {shiftOption: "end", e_id: 00001, date: "2023-04-30", hours: 8}
  const data = JSON.stringify({
    e_id: args.e_id,
    date: args.date,
    revert: args.revert,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };

  const response = await fetch(
    `http://localhost:3001/EmployeeResourcesAPI/RemoveShift`,
    options
  );
  const responseData = await response.json();
  return responseData;
};

export const Edit_Assignment_Get_Preview = async (args) => {
  const data = JSON.stringify({
    e_id: args.e_id,
    shiftRange: args.shiftRange,
    assigmentRangeOption: args.assigmentRangeOption,
    date: args.date,
  });
};

export const previewRemoveShift = async (args) => {
  const data = JSON.stringify({ e_id: args.e_id, date: args.date, hours: "1" });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };

  const response = await fetch(
    `http://localhost:3001/EmployeeResourcesAPI/PreviewRemoveShift`,
    options
  );
  const responseData = await response.json();
  return responseData;
};
