import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputLabel, TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "./styles";

function TextExtraInput({ required, label, placeholder, name }) {
  const { register } = useFormContext();
  const [addClicked, setAddClicked] = useState(false);

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>
        <>
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            fullWidth
            helperText=""
            placeholder={placeholder}
            {...register(name)}
          />
          <Button
            onClick={() => setAddClicked(!addClicked)}
            variant="outlined"
            size="small"
            color="primary"
            aria-label="Add"
            style={{
              marginLeft: 10,
              height: "auto",
            }}
          >
            {addClicked ? <RemoveIcon /> : <AddIcon />}
          </Button>
        </>
      </div>
      {addClicked ? (
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          fullWidth
          helperText=""
          style={styles.extra}
          placeholder={placeholder}
        />
      ) : null}
    </div>
  );
}

export default TextExtraInput;
