import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, Button } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styles";

function UploadInput({ required, label, uploadLabel, name }) {
  const { register } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState({});

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <label htmlFor={uploadLabel}>
          <input
            style={styles.upload}
            accept="*"
            id={uploadLabel}
            multiple
            type="file"
            {...register(name)}
            onChange={(event) => {
              if (event.target.files) {
                setUploadedFiles(event.target.files);
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
      </div>
      {Object.keys(uploadedFiles).length > 0 ? (
        <div style={styles.filesName}>
          Files:&nbsp;
          {Object.values(uploadedFiles).map((file, index) => (
            <div key={index} style={styles.uploadFileName}>
              {file.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default UploadInput;
