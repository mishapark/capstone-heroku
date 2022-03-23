import React, { useState } from "react";
import TextInput from "../../Input/TextInput";
import DownloadInput from "../../Input/DownloadInput";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangeInput from "../../Input/DateRangeInput";
import RecordType from "../../Input/RecordType";

function ComplianceReports() {

  return (
    <>
      <TextInput
        required={false}
        label="Report Number"
        placeholder="Enter Report Number"
        name="report_number"
      />
      <DownloadInput
        required={false}
        label="Download"
        uploadLabel="report_number_download"
        name="report_number_download"
      />
      <RecordType
        required={false}
        label="Record Type"
        placeholder="Enter Record Type"
        name="record_type"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangeInput
          required={false}
          label="Date"
          placeholder="Enter Report Number"
          name="date_range"
        />
      </LocalizationProvider>
    </>
  );
}

export default ComplianceReports;
