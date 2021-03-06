import React, { useState, useEffect } from "react";
import { InputLabel, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

function TextExtraInput({ required, label, placeholder, field, editContent }) {
  const [content, setContent] = useState(
    field.name === "family_series_model"
      ? editContent
        ? editContent["family_series_model"]
          ? editContent["family_series_model"][0].text
          : ""
        : ""
      : editContent
      ? editContent["manufacturer"]
        ? editContent["manufacturer"][0].name
        : ""
      : ""
  );
  const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    field.onChange({ ...field.value, text: content });
  }, []);

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        <FormattedMessage id={label} />
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
            value={content}
            onChange={(e) => {
              field.onChange({ ...field.value, text: e.target.value });
              setContent(e.target.value);
            }}
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
          onChange={(e) => {
            field.onChange({ ...field.value, extra_text: e.target.value });
          }}
        />
      ) : null}
    </div>
  );
}

export default TextExtraInput;
