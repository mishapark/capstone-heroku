import React, { useState } from "react";
import {
  InputLabel,
  Radio,
  FormGroup,
  RadioGroup,
  FormControlLabel,
  Button,
  Checkbox,
  Chip,
  InputAdornment,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import UploadIcon from "@mui/icons-material/Upload";

const countries = ["Russia", "Canada", "China", "Korea", "India", "Kongo"];

const styles = {
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 15,
    justifyContent: "flex-start",
  },
  inputLabel: {
    marginBottom: 10,
    textAlign: "left",
  },
  ipnutReq: { color: "red", marginRight: 5 },
  input: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  upload: {
    display: "none",
  },
  extra: {
    marginTop: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  fileName: {
    position: "absolute",

    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "30%",
    right: 20,
  },
  filesName: {
    marginTop: 10,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "80%",
  },
};

function InputText({
  label,
  type,
  required,
  options,
  placeholder,
  uploadLabel,
}) {
  const [addClicked, setAddClicked] = useState(false);
  const [radioValue, setRadioValue] = useState("No");
  const [radioOperationValue, setRadioOperationValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});

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
            placeholder={placeholder}
          />
        );
      case "text/numericWithX":
        const re = /^[0-9+Xx\b]+$/;
        return (
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            fullWidth
            helperText=""
            onKeyPress={(event) => {
              if (!re.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder={placeholder}
          />
        );
      case "text/numericDecimals":
        return (
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            fullWidth
            helperText=""
            type="number"
            placeholder={placeholder}
          />
        );
      case "text/celcius":
        return (
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            fullWidth
            helperText=""
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">°C</InputAdornment>
              ),
            }}
            placeholder={placeholder}
          />
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
              placeholder={placeholder}
            />
            <Button
              onClick={() => setAddClicked(!addClicked)}
              variant="outlined"
              size="small"
              color="primary"
              aria-label="Add"
              style={{
                marginLeft: 15,
                height: "100%",
              }}
            >
              {addClicked ? <RemoveIcon /> : <AddIcon />}
            </Button>
          </>
        );
      case "autocomplete":
        return (
          <>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              size="medium"
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
                />
              )}
            />
          </>
        );
      case "autocomplete/free":
        return (
          <>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              size="medium"
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
                  placeholder={placeholder}
                />
              )}
            />
          </>
        );
      case "autocomplete/sections":
        return (
          <>
            <Autocomplete
              limitTags={2}
              multiple
              id="fixed-tags-demo"
              options={countries}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              fullWidth
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder={placeholder} />
              )}
            />
          </>
        );
      case "autocomplete/categories/free":
        return (
          <Autocomplete
            fullWidth
            freeSolo
            id="grouped-demo"
            options={options.reduce((acc, current) => {
              const optionRows = [];
              current.values.map((v) => {
                optionRows.push({
                  type: current.category,
                  name: v,
                });
              });
              acc = acc.concat(optionRows);
              return acc;
            }, [])}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder={placeholder} />
            )}
          />
        );
      case "checkbox":
        return (
          <FormGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {options.map((option) => (
              <FormControlLabel
                control={<Checkbox color="primary" />}
                key={option}
                value={option}
                label={option}
              />
            ))}
          </FormGroup>
        );
      case "radio":
        return (
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" />}
                label={option}
              />
            ))}
          </RadioGroup>
        );
      case "radio/upload":
        return (
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
                  control={<Radio color="primary" />}
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
        );
      case "radio/text":
        return (
          <>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => setRadioOperationValue(event.target.value)}
              defaultValue={radioValue}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio color="primary" />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </>
        );
      case "upload":
        return (
          <>
            <label htmlFor={uploadLabel}>
              <input
                style={styles.upload}
                accept="*"
                id={uploadLabel}
                multiple
                type="file"
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
          </>
        );
      default:
        break;
    }
  };

  return (
    <div style={styles.inputContainer}>
      <InputLabel style={styles.inputLabel} htmlFor="component-error">
        {required ? <span style={styles.ipnutReq}>*</span> : null}
        {label}
      </InputLabel>
      <div style={styles.input}>{renderInput()}</div>
      {addClicked ? (
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          fullWidth
          helperText=""
          style={styles.extra}
        />
      ) : null}
      {radioOperationValue === "Duty Cycle" ? (
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          fullWidth
          helperText=""
          placeholder="Enter Duty Cycle"
          style={styles.extra}
        />
      ) : null}
      {Object.keys(uploadedFiles).length > 0 ? (
        <div style={styles.filesName}>
          Files:&nbsp;
          {Object.values(uploadedFiles).map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default InputText;
