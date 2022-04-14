import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@material-ui/core";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function CategoryInput({
  required,
  label,
  placeholder,
  standards,
  onCategoryChange,
  name,
  editContent,
}) {
  const [content, setContent] = useState(
    editContent ? editContent[name] : "BATT"
  );
  const { register } = useFormContext();
  const options = Array.from(
    new Set(standards.map((standard) => standard["standard_category"]))
  );

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
      </InputLabel>
      <div style={styles.input}>
        <>
          <Autocomplete
            disableClearable
            disablePortal
            id="combo-box-demo"
            options={options}
            fullWidth
            className="px-0"
            variant="outlined"
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder={placeholder}
                {...register(name)}
              />
            )}
            inputValue={content}
            value={content}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => {
              onCategoryChange(value);
              setContent(value);
            }}
          />
        </>
      </div>
    </div>
  );
}

export default CategoryInput;
