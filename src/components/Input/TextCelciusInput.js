import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField, InputAdornment } from "@material-ui/core";
import styles from "./styles";

function TextCelciusInput({ required, label, placeholder, name }) {
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          fullWidth
          helperText=""
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">°C</InputAdornment>
            ),
          }}
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default TextCelciusInput;
