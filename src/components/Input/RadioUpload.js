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
import { FormattedMessage } from "react-intl";

function RadioUpload({ required, label, options, name, editContent }) {
  const { register } = useFormContext();
  const [uploadedFile, setUploadedFile] = useState("");
  const [radioOperationValue, setRadioOperationValue] = useState(
    editContent ? (editContent[name].status ? "Yes" : "No") : ""
  );

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
      </InputLabel>
      <div style={styles.input}>
        <>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radioOperationValue}
            onChange={(event) => {
              setRadioOperationValue(event.target.value);
            }}
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
          {radioOperationValue === "Yes" ? (
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
                  component="span"
                  startIcon={<UploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </>
          ) : null}
        </>
        <div style={styles.fileName}>{uploadedFile}</div>
      </div>
    </div>
  );
}

export default RadioUpload;
