import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField, Chip } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./styles";

function CountriesInput({ required, label, placeholder, options, name }) {
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
            limitTags={2}
            multiple
            id="fixed-tags-demo"
            options={options}
            groupBy={(option) => option.firstLetter}
            // getOptionLabel={(option) => option}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            fullWidth
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
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

export default CountriesInput;
