import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function RadioInput({ required, label, options, name, editContent }) {
  const [radioValue, setRadioValue] = useState(
    editContent ? (editContent[name] ? editContent[name] : "") : ""
  );
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
      </InputLabel>
      <div style={styles.input}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={radioValue}
          onChange={(event) => {
            setRadioValue(event.target.value);
          }}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.name}
              value={option.name}
              control={<Radio color="primary" {...register(name)} />}
              label={option.name}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default RadioInput;
