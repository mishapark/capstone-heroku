import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField, InputAdornment } from "@mui/material";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function TextCelciusInput({ required, label, placeholder, name, editContent }) {
  const [content, setContent] = useState(
    editContent
      ? editContent.max_operating_ambient
        ? editContent.max_operating_ambient
        : ""
      : ""
  );
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TextCelciusInput;
