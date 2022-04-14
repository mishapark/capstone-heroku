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
import { FormattedMessage } from "react-intl";

function RadioTextInput({
  required,
  label,
  options,
  name,
  textName,
  editContent,
}) {
  const { register } = useFormContext();
  const [radioOperationValue, setRadioOperationValue] = useState(
    editContent
      ? editContent[name].selected_mode
        ? editContent[name].selected_mode
        : ""
      : ""
  );
  const [content, setContent] = useState(
    editContent ? (editContent[name].ratio ? editContent[name].ratio : "") : ""
  );

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
          value={radioOperationValue}
          onChange={(event) => {
            setRadioOperationValue(event.target.value);
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : null}
    </div>
  );
}

export default RadioTextInput;
