import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./styles";

const records = [
  {
    title: "Reports",
    options: [
      "Safety  Report",
      "UL/CSA Report",
      "NRTL Report",
      "Laser Report",
      "IEC Report",
      "CE Report",
      "EMC Report",
      "CB Report",
    ],
  },
  {
    title: "Cert",
    options: [
      "CE Cert",
      "CETL US Cert",
      "UR Cert",
      "UL Cert",
      "CSA Cert",
      "C-ULUS Cert",
      "TUV Cert",
    ],
  },
  {
    title: "Financials",
    options: [
      "Agent Aggrement",
      "Client Authorization",
      "File COntents",
      "Checklists",
      "Inter office Transfers",
      "Invoice",
      "Invoice Summary Form",
      "Job Order Entry form",
      "MLS Form",
      "Other",
      "Purchase Order",
      "Quote",
      "RAF",
      "Sub-con work aggrement",
      "MAster Service Aggrement",
      "Sub con invoice",
    ],
  },
  {
    title: "Technical",
    options: [
      "Construction Review",
      "Test Data Sheet",
      "Test Plan",
      "Non COmpliance Report",
      "Finding Report",
      "Compliance Report",
    ],
  },
  {
    title: "Correspondance",
    options: ["Email", "Other"],
  },
  {
    title: "Audit Report",
    options: ["Audit Report"],
  },
  {
    title: "Test Report",
    options: ["Test Report"],
  },
  {
    title: "Issued Certificate",
    options: ["Issued Certificate"],
  },
  {
    title: "Supporting Documents",
    options: [
      "Caliberation Cert",
      "Client Information Sheet",
      "Component Information Sheet",
      "Draft Report Sheet",
      "Marking Labels",
      "Other",
      "Photo",
      "Product Information",
      "Schematic Drawing",
      "3rd Party Certification Report",
      "File Transfer Letter",
    ],
  },
];

const newarr = records.map(e => {
  return e.options.reduce((acc, current) => {
    const optionRows = [];
    optionRows.push({
      title: e.title,
      options: current,
    });
    acc = acc.concat(optionRows);
    return acc;
  }, [])
})

function RecordType({ required, label, placeholder, name }) {
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <Autocomplete
          size="small"
          options={
            [].concat(...newarr)
          }
          groupBy={(option) => option.title}
          getOptionLabel={(option) => option.options}
          fullWidth
          renderInput={(params) => (
            <TextField
              size="small"
              variant="outlined"
              {...params}
              placeholder={placeholder}
              {...register(name)}
            />
          )}
        />
      </div>
    </div>
  );
}

export default RecordType;
