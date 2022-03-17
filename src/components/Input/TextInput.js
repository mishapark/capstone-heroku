import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import styles from "./styles";

function TextInput({
  required,
  label,
  placeholder,
  name,
  type,
  editContent,
  handleChange,
  value,
}) {
  const { register } = useFormContext();
  // console.log(editContent, name);
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
          helperText="cvz"
          error={false}
          type={type && type}
          onChange={handleChange}
          value={value && value}
          // value={editContent ? editContent[name] : ""}
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default TextInput;
