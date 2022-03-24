import React from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, Chip } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./styles";

function CountriesInput({ required, label, placeholder, options, onChange }) {
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
              const continentA = a.continents[0];
              const continentB = b.continents[0];
              const countryA = a.name.common;
              const countryB = b.name.common;

              return (
                continentA.localeCompare(continentB) ||
                countryA.localeCompare(countryB)
              );
            })
            .reduce((acc, current) => {
              const optionRows = [];
              optionRows.push({
                country_name: current.name.common,
                continent_name: current.continents[0],
                country_code: current.idd.suffixes
                  ? current.idd.root + current.idd.suffixes[0]
                  : current.idd.root,
                continent_code:
                  current.continents[0] === "Africa"
                    ? "AF"
                    : current.continents[0] === "Antarctica"
                    ? "AN"
                    : current.continents[0] === "Asia"
                    ? "AS"
                    : current.continents[0] === "Europe"
                    ? "EU"
                    : current.continents[0] === "North America"
                    ? "NA"
                    : current.continents[0] === "Oceania"
                    ? "OC"
                    : current.continents[0] === "South America"
                    ? "SA"
                    : "",
              });
              acc = acc.concat(optionRows);
              return acc;
            }, [])}
          groupBy={(option) => option.continent_name}
          getOptionLabel={(option) => option.country_name}
          fullWidth
          onChange={(event, value) => onChange(value)}
          renderInput={(params) => (
            <TextField
              size="small"
              variant="outlined"
              {...params}
              placeholder={placeholder}
            />
          )}
        />
      </div>
    </div>
  );
}

export default CountriesInput;
