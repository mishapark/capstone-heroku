import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import styles from "./styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function TextSizeInput({ required, label, placeholder, name, editContent }) {
  const [acContent, setAcContent] = useState(
    editContent ? editContent[name].unit : ""
  );
  const [content, setContent] = useState(
    editContent
      ? editContent[name].width
        ? editContent[name].length
          ? editContent[name].height
            ? `${editContent[name].width}x${editContent[name].length}x${editContent[name].height}`
            : `${editContent[name].width}x${editContent[name].length}`
          : `${editContent[name].width}`
        : ""
      : ""
  );

  const { register } = useFormContext();
  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <TextField
          sx={{ mr: 2 }}
          id="outlined-basic"
          variant="outlined"
          fullWidth
          helperText=""
          size="small"
          placeholder={placeholder}
          {...register(name)}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Autocomplete
          disableClearable
          disablePortal
          id="combo-box-demo"
          options={["mm", "cm", "mtr"]}
          size="small"
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={"Unit"}
              {...register("equipment_size_unit")}
            />
          )}
          inputValue={acContent}
          value={acContent}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) => {
            setAcContent(value);
          }}
        />
      </div>
    </div>
  );
}

export default TextSizeInput;
