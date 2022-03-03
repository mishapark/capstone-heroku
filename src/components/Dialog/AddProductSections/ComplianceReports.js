import React, { useState } from "react";
import TextInput from "../../Input/TextInput";
import DownloadInput from "../../Input/DownloadInput";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangeInput from "../../Input/DateRangeInput";
import RecordType from "../../Input/RecordType";

function ComplianceReports() {
  const [value, setValue] = useState([null, null]);

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
        uploadLabel="copy-or-marking-plate"
        name="marking_plate"
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
          value={value}
          onChange={(newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
        />
      </LocalizationProvider>
    </>
  );
}

export default ComplianceReports;
