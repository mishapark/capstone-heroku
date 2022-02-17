import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./styles";

function AutocompleteInput({ required, label, placeholder, options, name }) {
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
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
                placeholder={placeholder}
                {...register(name)}
              />
            )}
          />
        </>
      </div>
    </div>
  );
}

export default AutocompleteInput;
