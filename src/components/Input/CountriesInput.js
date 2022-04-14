import React, { useEffect } from "react";
import { InputLabel } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function CountriesInput({
  required,
  label,
  placeholder,
  options,
  onChange,
  editContent,
}) {
  useEffect(() => {
    const value = editContent
      ? editContent.market
        ? editContent.market
        : null
      : null;
    onChange(value);
  }, []);

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
      </InputLabel>
      <div style={styles.input}>
        <Autocomplete
          limitTags={2}
          multiple
          size="small"
          id="fixed-tags-demo"
          defaultValue={
            editContent ? (editContent.market ? editContent.market : []) : []
          }
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
          isOptionEqualToValue={(option, value) =>
            option.country_name === value.country_name
          }
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
