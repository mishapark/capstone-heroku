import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Button,
  Radio,
} from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styles";

function RadioUpload({ required, label, options, name }) {
  const { register } = useFormContext();
  const [radioValue, setRadioValue] = useState("No");
  const [uploadedFile, setUploadedFile] = useState("");

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(event) => setRadioValue(event.target.value)}
            defaultValue={radioValue}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" {...register(name)} />}
                label={option}
              />
            ))}
          </RadioGroup>
          {radioValue === "Yes" ? (
            <>
              <label htmlFor="contained-button-file">
                <input
                  style={styles.upload}
                  accept="*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      setUploadedFile(event.target.files[0].name);
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  style={styles.marginLeft}
                  component="span"
                  startIcon={<UploadIcon />}
                >
                  Upload
                </Button>
              </label>
              <span style={styles.fileName}>{uploadedFile}</span>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
}

export default RadioUpload;
