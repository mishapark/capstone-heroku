import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

function InputText({ label, type, required, radioOptions, optional }) {
  const [addClicked, setAddClicked] = useState(false);
  const addTextField = () => {
    return (
      <TextField
        id="outlined-basic"
        size="small"
        variant="outlined"
        fullWidth
        helperText=""
      />
    );
  };
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            fullWidth
            helperText=""
          />
        );
      case "radio":
        return (
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {radioOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" />}
                label={option}
              />
            ))}
          </RadioGroup>
        );
      case "text/extra":
        return (
          <>
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              fullWidth
              helperText=""
            />
            <Button
              onClick={() => setAddClicked(true)}
              variant="contained"
              size="small"
              color="primary"
              aria-label="Add"
              style={{
                marginLeft: 15,
              }}
            >
              <AddIcon />
            </Button>
          </>
        );
      default:
        break;
    }
  };

  return !optional ? (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        marginBottom: 15,
        justifyContent: "flex-end",
      }}
    >
      <InputLabel
        style={{
          marginRight: 15,
          marginTop: 13,
          minWidth: 300,
          textAlign: "right",
        }}
        htmlFor="component-error"
      >
        {required ? (
          <span style={{ color: "red", marginRight: 5 }}>*</span>
        ) : null}
        {label}
      </InputLabel>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          minWidth: 350,
        }}
      >
        {renderInput()}
      </div>
    </div>
  ) : null;
}

export default InputText;
