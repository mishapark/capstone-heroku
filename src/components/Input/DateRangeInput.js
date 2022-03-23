import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import styles from "./styles";

function DateRangeInput({
  required,
  label,
  placeholder,
  name,
  type,
  editContent,
}) {
  const [value, setValue] = useState([null, null]);

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <DateRangePicker
          startText="Issued Date"
          endText="Expiry Date"
          value={value}
          onChange={(newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField
                size="small"
                {...startProps}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                helperText=""
                // {...register(name)}
              />
              <Box sx={{ mx: 2 }}> & </Box>
              <TextField
                size="small"
                {...endProps}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                helperText=""
                // {...register(name)}
              />
            </React.Fragment>
          )}
        />
      </div>
    </div>
  );
}

export default DateRangeInput;
