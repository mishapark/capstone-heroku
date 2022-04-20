import React, { useState } from "react";
import TextInput from "../../Input/TextInput";
import DownloadInput from "../../Input/DownloadInput";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangeInput from "../../Input/DateRangeInput";
import RecordType from "../../Input/RecordType";
import { InputLabel } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import AutocompleteCompliances from "../../Input/AutocompleteCompliances";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Controller } from "react-hook-form";

const styles = {
  inputContainer: {
    flex: "0 0 23.5%",
    marginBottom: 10,
    marginRight: 10,
  },
  inputLabel: {
    marginBottom: 10,
    textAlign: "left",
  },
};

function ComplianceReports({ compliances, editContent }) {
  const complReportNumber = {
    compliance_report_number: editContent ? editContent : "",
  };

  return (
    <>
      <div style={styles.inputContainer}>
        <InputLabel style={styles.inputLabel} htmlFor="component-error">
          <FormattedMessage id={"Report Number"} />
        </InputLabel>

        <Controller
          name="compliance_report_number"
          render={({ field: { onChange } }) => (
            <AutocompleteCompliances
              required={false}
              placeholder="Enter Report Number"
              onChange={onChange}
              editContent={editContent}
              options={compliances}
            />
          )}
        />
      </div>
      {/* <TextInput
        required={false}
        label="Report Number"
        placeholder="Enter Report Number"
        name="compliance_report_number"
        editContent={complReportNumber}
      /> */}
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
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangeInput
          required={false}
          label="Expiry Date"
          placeholder="Enter Date"
          name="date_range"
        />
      </LocalizationProvider> */}
    </>
  );
}

export default ComplianceReports;
