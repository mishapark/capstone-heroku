import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function AutocompleteCompliances({
  placeholder,
  options,
  onChange,
  editContent,
}) {
  useEffect(() => {
    const value = editContent ? editContent : null;
    onChange(value);
  }, []);

  return (
    <Autocomplete
      limitTags={2}
      multiple
      disablePortal
      id="combo-box-demo"
      options={options.map((e) => e.report_number)}
      fullWidth
      className="px-0"
      variant="outlined"
      defaultValue={editContent ? editContent : []}
      onChange={(event, value) => {
        onChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="outlined-basic"
          variant="outlined"
          size="small"
          placeholder={placeholder}
          style={{ marginBottom: 10 }}
        />
      )}
    />
  );
}

export default AutocompleteCompliances;
