import React from "react";
import { useFormContext } from "react-hook-form";
import {
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import styles from "./styles";

function CheckboxInput({ required, label, options, name }) {
  const { register } = useFormContext();
  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <FormGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {options.map((option) => (
            <FormControlLabel
              control={<Checkbox color="primary" {...register(name)} />}
              key={option}
              value={option}
              label={option}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
}

export default CheckboxInput;
