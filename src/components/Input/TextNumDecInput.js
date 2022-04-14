import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function TextNumDecInput({ required, label, placeholder, name, editContent }) {
  const { register } = useFormContext();
  const [content, setContent] = useState(
    editContent
      ? editContent.equipment_mass
        ? editContent.equipment_mass
        : ""
      : ""
  );
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
          placeholder={placeholder}
          {...register(name)}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TextNumDecInput;
