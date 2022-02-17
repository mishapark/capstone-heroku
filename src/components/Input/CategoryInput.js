import React from "react";
import { useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@material-ui/core";
import styles from "./styles";

function CategoryInput({
  required,
  label,
  placeholder,
  standards,
  onCategoryChange,
  name,
}) {
  const { register } = useFormContext();
  const options = Array.from(
    new Set(standards.map((standard) => standard["standard_category"]))
  );
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
            onChange={(event, value) => onCategoryChange(value)}
          />
        </>
      </div>
    </div>
  );
}

export default CategoryInput;
