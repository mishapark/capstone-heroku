import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
} from "@material-ui/core";
import styles from "./styles";

function RadioTextInput({ required, label, options, name, textName }) {
  const { register } = useFormContext();
  const [radioOperationValue, setRadioOperationValue] = useState("");

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
          onChange={(event) => setRadioOperationValue(event.target.value)}
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
      {radioOperationValue === "Duty Cycle" ? (
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          fullWidth
          helperText=""
          placeholder="Enter Duty Cycle"
          style={styles.extra}
          {...register(textName)}
        />
      ) : null}
    </div>
  );
}

export default RadioTextInput;
