import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import styles from "./styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function TextSizeInput({ required, label, placeholder, name }) {
  const { register } = useFormContext();
  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <TextField
          sx={{ mr: 2, width: "200%" }}
          id="outlined-basic"
          size="small"
          variant="outlined"
          fullWidth
          helperText=""
          placeholder={placeholder}
          {...register(name)}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["mm", "cm", "mtr"]}
          size="medium"
          fullWidth
          className="px-0"
          variant="outlined"
          renderInput={(params) => (
            <TextField
              {...params}
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder={"Unit"}
              {...register("equipment_size_unit")}
            />
          )}
        />
      </div>
    </div>
  );
}

export default TextSizeInput;
