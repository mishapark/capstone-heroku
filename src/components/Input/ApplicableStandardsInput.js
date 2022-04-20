import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function ApplicableStandardsInput({
  required,
  label,
  options,
  category,
  name,
  editContent,
}) {
  const [content, setContent] = useState(
    editContent ? editContent[name] : "IEC 60086-1:2015"
  );
  const { register } = useFormContext();
  const [standards, setStandards] = useState([]);

  const getStandardsByCat = options.filter(
    (s) => s["standard_category"] === category
  );

  useEffect(() => {
    if (getStandardsByCat[0]) {
      setStandards(getStandardsByCat[0]["standard_body"]);
    }
  });

  useEffect(() => {
    if (getStandardsByCat[0]) {
      setContent(getStandardsByCat[0]["standard_body"][0]);
    }
  }, [category]);

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
      </InputLabel>
      <div style={styles.input}>
        <Autocomplete
          disableClearable
          disablePortal
          id="combo-box-demo"
          options={standards}
          size="small"
          freeSolo
          fullWidth
          className="px-0"
          variant="outlined"
          renderInput={(params) => (
            <TextField
              {...params}
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter Applicable Standards"
              {...register(name)}
            />
          )}
          inputValue={content}
          value={content}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) => {
            setContent(value);
          }}
        />
      </div>
    </div>
  );
}

export default ApplicableStandardsInput;
