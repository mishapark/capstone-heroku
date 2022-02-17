import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import styles from "./styles";

function TextNumX({ required, label, placeholder, name }) {
  const { register } = useFormContext();

  const re = /^[0-9+Xx\b]+$/;
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
          onKeyPress={(event) => {
            if (!re.test(event.key)) {
              event.preventDefault();
            }
          }}
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default TextNumX;
