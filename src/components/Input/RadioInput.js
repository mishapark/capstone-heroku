import React from "react";
import { useFormContext } from "react-hook-form";
import {
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import styles from "./styles";

function RadioInput({ required, label, options, name }) {
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio color="primary" {...register(name)} />}
              label={option}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default RadioInput;
