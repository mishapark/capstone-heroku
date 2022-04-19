import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getCountries } from "../../api/countries";

export const AddCompliance = ({ open, handleClickOpen, handleClose }) => {
  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        scroll="paper"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add New Compliance</DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <Stack spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TextField label="Regulatory Authority"></TextField>
              <TextField label="Applied Standard"></TextField>
              <TextField label="Sub-Sections"></TextField>
              <TextField label="Reference ID"></TextField>
              <TextField label="Status"></TextField>
              <TextField label="Originator"></TextField>
              <DesktopDatePicker
                label="Compliance Start Date"
                value={value}
                onChange={(e) => handleDate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Compliance End Date"
                value={value2}
                onChange={(e) => handleDate2(e)}
                renderInput={(params) => <TextField {...params} />}
              />
              <Autocomplete
                limitTags={1}
                size="small"
                id="fixed-tags-demo"
                options={countries
                  .sort((a, b) => {
                    const continentA = a.continents[0];
                    const continentB = b.continents[0];
                    const countryA = a.name.common;
                    const countryB = b.name.common;

                    return (
                      continentA.localeCompare(continentB) ||
                      countryA.localeCompare(countryB)
                    );
                  })
                  .reduce((acc, current) => {
                    const optionRows = [];
                    optionRows.push({
                      country_name: current.name.common,
                      continent_name: current.continents[0],
                      country_code: current.idd.suffixes
                        ? current.idd.root + current.idd.suffixes[0]
                        : current.idd.root,
                      continent_code:
                        current.continents[0] === "Africa"
                          ? "AF"
                          : current.continents[0] === "Antarctica"
                          ? "AN"
                          : current.continents[0] === "Asia"
                          ? "AS"
                          : current.continents[0] === "Europe"
                          ? "EU"
                          : current.continents[0] === "North America"
                          ? "NA"
                          : current.continents[0] === "Oceania"
                          ? "OC"
                          : current.continents[0] === "South America"
                          ? "SA"
                          : "",
                    });
                    acc = acc.concat(optionRows);
                    return acc;
                  }, [])}
                groupBy={(option) => option.continent_name}
                getOptionLabel={(option) => option.country_name}
                fullWidth
                onChange={(event, value) => handleCountryChange(value)}
                isOptionEqualToValue={(option, value) =>
                  option.country_name === value.country_name
                }
                renderInput={(params) => (
                  <TextField
                    size="small"
                    label="Country"
                    variant="outlined"
                    {...params}
                    //placeholder={placeholder}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
