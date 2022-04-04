import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import styles from "./styles";

function CheckboxInput({ required, label, options, name }) {
  const [state, setState] = useState(options);
  const { register } = useFormContext();

  const handleChange = (event) => {
    setState(
      state.map((object) => {
        if (object.name === event.target.value) {
          return { ...object, isChecked: event.target.checked };
        }
        return object;
      })
    );
  };

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
          {state.map((option, i) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  {...register(name)}
                  checked={option.isChecked}
                  onChange={handleChange}
                />
              }
              key={option.name}
              value={option.name}
              label={option.name}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
}

export default CheckboxInput;
