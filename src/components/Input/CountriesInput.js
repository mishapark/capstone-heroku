import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, Chip } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
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
        <Autocomplete
          limitTags={2}
          multiple
          size="small"
          id="fixed-tags-demo"
          options={options
            .sort((a, b) => {
              const countryA = a.continents[0];
              const countryB = b.continents[0];
              if (countryA < countryB) {
                return -1;
              }
              if (countryA > countryB) {
                return 1;
              }
            })
            .reduce((acc, current) => {
              const optionRows = [];
              optionRows.push({
                country: current.name.common,
                continent: current.continents[0],
              });
              acc = acc.concat(optionRows);
              return acc;
            }, [])}
          groupBy={(option) => option.continent}
          getOptionLabel={(option) => option.country}
          fullWidth
          renderInput={(params) => (
            <TextField
              size="small"
              variant="outlined"
              {...params}
              placeholder={placeholder}
              {...register(name)}
            />
          )}
        />
      </div>
    </div>
  );
}

export default CountriesInput;
