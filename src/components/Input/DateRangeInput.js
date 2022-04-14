import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@material-ui/core";
import DatePicker from "@mui/lab/DatePicker";
import styles from "./styles";
import { useFormContext } from "react-hook-form";

function DateRangeInput({ required, label, name, editContent }) {
  const [value, setValue] = useState(null);
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" {...register(name)} />
          )}
        />
      </div>
    </div>
  );
}

export default DateRangeInput;
