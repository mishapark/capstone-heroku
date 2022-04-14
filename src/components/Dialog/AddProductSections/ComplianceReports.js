import React, { useState } from "react";
import TextInput from "../../Input/TextInput";
import DownloadInput from "../../Input/DownloadInput";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangeInput from "../../Input/DateRangeInput";
import RecordType from "../../Input/RecordType";

function ComplianceReports({ editContent }) {
  const complReportNumber = {
    compliance_report_number: editContent ? editContent[0] : 0,
  };
  console.log(complReportNumber);
  return (
    <>
      <TextInput
        required={false}
        label="Report Number"
        placeholder="Enter Report Number"
        name="compliance_report_number"
        editContent={complReportNumber}
      />
      {/* <DownloadInput
        required={false}
        label="Download"
        uploadLabel="report_number_download"
        name="report_number_download"
      /> */}
      {/* <RecordType
        required={false}
        label="Record Type"
        placeholder="Enter Record Type"
        name="record_type"
      /> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangeInput
          required={false}
          label="Expiry Date"
          placeholder="Enter Date"
          name="date_range"
        />
      </LocalizationProvider>
    </>
  );
}

export default ComplianceReports;
