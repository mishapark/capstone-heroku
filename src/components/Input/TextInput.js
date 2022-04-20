import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@mui/material";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function TextInput({ required, label, placeholder, name, type, editContent }) {
  const [content, setContent] = useState(
    editContent
      ? editContent[name]
        ? typeof editContent[name] === "string" ||
          typeof editContent[name] === "number"
          ? editContent[name]
          : editContent[name].name
          ? editContent[name].name
          : ""
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
          type={type && type}
          placeholder={placeholder}
          {...register(name)}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TextInput;
