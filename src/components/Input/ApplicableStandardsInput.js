import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { InputLabel } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import styles from "./styles";

function ApplicableStandardsInput({
  required,
  label,
  options,
  category,
  name,
}) {
  const { register } = useFormContext();
  const [standards, setStandards] = useState([]);
  const getStandards = options
    .map((s) => s["standard_body"])
    .reduce((prev, curr) => prev.concat(curr), []);
  const getStandardsByCat = options.filter(
    (s) => s["standard_category"] === category
  );

  useEffect(() => {
    if (category !== "") {
      if (getStandardsByCat[0]) {
        setStandards(getStandardsByCat[0]["standard_body"]);
      }
    }
    if (category === null) {
      setStandards(getStandards);
    }
  }, [category]);

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={standards}
          size="small"
          freeSolo
          fullWidth
          className="px-0"
          variant="outlined"
          renderInput={(params) => (
            <TextField
              {...params}
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter Applicable Standards"
              {...register(name)}
            />
          )}
        />
      </div>
    </div>
  );
}

export default ApplicableStandardsInput;
