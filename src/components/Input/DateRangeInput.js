import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import styles from "./styles";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

function DateRangeInput({ required, label, name, editContent }) {
  const [value, setValue] = useState(null);
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
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
