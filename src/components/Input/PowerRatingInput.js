import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import styles from "./styles";

function PowerRatingInput({
  required,
  label,
  placeholder,
  options,
  field,
  editContent,
}) {
  const [content, setContent] = useState(
    editContent ? editContent.power_rating : ""
  );

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.powerInput}>
        {options.map((e) => (
          <div style={styles.powerFields}>
            <p style={{ width: 250 }}>{e}</p>
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              fullWidth
              helperText=""
              type="number"
              placeholder={placeholder}
              value={content[e.toLowerCase()]}
              onChange={(event) => {
                field.onChange({
                  ...field.value,
                  [e.toLowerCase()]: event.target.value,
                });
                setContent({
                  ...field.value,
                  [e.toLowerCase()]: event.target.value,
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PowerRatingInput;
