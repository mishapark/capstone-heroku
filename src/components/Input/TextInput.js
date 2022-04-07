import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import styles from "./styles";

function TextInput({ required, label, placeholder, name, type, editContent }) {
  const [content, setContent] = useState(
    editContent
      ? typeof editContent[name] === "string"
        ? editContent[name]
        : editContent[name].name
        ? editContent[name].name
        : ""
      : ""

    // editContent
    //   ? typeof editContent[name] !== "object"
    //     ? editContent[name]
    //     : editContent[name].name
    //     ? editContent[name].name
    //     : ""
    //   : ""
  );
  const { register } = useFormContext();
  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
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
