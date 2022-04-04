import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormGroup,
  FormLabel,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import styles from "./styles";

function SupplyConnInput({ required, label, placeholder, options, name }) {
  const [state, setState] = useState(options);
  const { register } = useFormContext();

  const handleChange = (event) => {
    console.log(event.target);
    setState(
      state.map((object) => {
        return {
          ...object,
          values: object.values.map((insideObj) => {
            if (insideObj.name === event.target.value) {
              return { ...insideObj, isChecked: event.target.checked };
            }
            return insideObj;
          }),
        };
      })
    );
  };

  return (
    <div
      style={{
        display: "inline-block",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "0 10px 10px 0",
        width: "calc(70% - 10px - 1px)",
        justifyContent: "flex-start",
      }}
    >
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginTop: 20,
        }}
      >
        {state.map((o, index) => (
          <div key={index} style={styles.supplySub}>
            <FormLabel
              style={{
                marginBottom: 10,
              }}
            >
              {o.category}
            </FormLabel>
            <FormGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {o.values.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      {...register(name)}
                      checked={option.isChecked}
                      onChange={handleChange}
                    />
                  }
                  key={option.name}
                  value={option.name}
                  label={option.name}
                />
              ))}
            </FormGroup>
          </div>
        ))}
        {/* <div style={styles.supplySub}>
          <FormLabel
            style={{
              marginBottom: 10,
            }}
          >
            {"Other"}
          </FormLabel>
          <TextField
            variant="outlined"
            size="small"
            placeholder={"Enter type"}
            {...register(name)}
          />
        </div> */}
      </div>
    </div>
  );
}

export default SupplyConnInput;
