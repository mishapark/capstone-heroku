import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./styles";

function SupplyConnInput({ required, label, placeholder, options, name }) {
  const { register } = useFormContext();

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <Autocomplete
          fullWidth
          freeSolo
          id="grouped-demo"
          options={options.reduce((acc, current) => {
            const optionRows = [];
            current.values.map((v) => {
              optionRows.push({
                type: current.category,
                name: v,
              });
            });
            acc = acc.concat(optionRows);
            return acc;
          }, [])}
          groupBy={(option) => option.type}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              placeholder={placeholder}
              {...register(name)}
            />
          )}
        />
      </div>
    </div>
  );
}

export default SupplyConnInput;
