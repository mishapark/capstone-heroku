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
import useAuth from "../../hooks/useAuth";

export const AddCompliance = ({ open, handleClickOpen, handleClose, data }) => {
  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [countries, setCountries] = React.useState([]);

  const { auth, setAuth } = useAuth();

  const recordType = [
    { record_type: "Safety  Report", group: "Reports" },
    { record_type: "UL/CSA Report", group: "Reports" },
    { record_type: "NRTL Report", group: "Reports" },
    { record_type: "Laser Report", group: "Reports" },
    { record_type: "IEC Report", group: "Reports" },
    { record_type: "CE Report", group: "Reports" },
    { record_type: "EMC Report", group: "Reports" },
    { record_type: "CB Report", group: "Reports" },
    { record_type: "CE Cert", group: "Cert" },
    { record_type: "CETL US Cert", group: "Cert" },
    { record_type: "CB Report", group: "Cert" },
    { record_type: "UR Cert", group: "Cert" },
    { record_type: "UL Cert", group: "Cert" },
    { record_type: "CSA Cert", group: "Cert" },
    { record_type: "C-ULUS Cert", group: "Cert" },
    { record_type: "TUV Cert", group: "Cert" },
    { record_type: "TUV Cert", group: "Financials" },
    { record_type: "Agent Aggrement", group: "Financials" },
    { record_type: "Client Authorization", group: "Financials" },
    { record_type: "File Contents", group: "Financials" },
    { record_type: "Checklists", group: "Financials" },
    { record_type: "Inter office Transfers", group: "Financials" },
    { record_type: "Invoice", group: "Financials" },
    { record_type: "Invoice Summary Form", group: "Financials" },
    { record_type: "Job Order Entry form", group: "Financials" },
    { record_type: "MLS Form", group: "Financials" },
    { record_type: "Other", group: "Financials" },
    { record_type: "Purchase Order", group: "Financials" },
    { record_type: "Quote", group: "Financials" },
    { record_type: "RAF", group: "Financials" },
    { record_type: "Sub-con work aggrement", group: "Financials" },
    { record_type: "Master Service Aggrement", group: "Financials" },
    { record_type: "Sub con invoice", group: "Financials" },
    { record_type: "Construction Review", group: "Technical" },
    { record_type: "Test Data Sheet", group: "Technical" },
    { record_type: "Test Plan", group: "Technical" },
    { record_type: "Test Data Sheet", group: "Technical" },
    { record_type: "Non Compliance Report", group: "Technical" },
    { record_type: "Finding Report", group: "Technical" },
    { record_type: "Compliance Report", group: "Technical" },
    { record_type: "Email", group: "Correspondence" },
    { record_type: "Other", group: "Correspondence" },
    { record_type: "Audit Report", group: "Audit Report" },
    { record_type: "Test Report", group: "Test Report" },
    { record_type: "Issued Certificate", group: "Issued Certificate" },
    { record_type: "Caliberation Cert", group: "Supporting Documents" },
    { record_type: "Client Information Sheet", group: "Supporting Documents" },
    {
      record_type: "Component Information Sheet",
      group: "Supporting Documents",
    },
    { record_type: "Draft Report Sheet", group: "Supporting Documents" },
    { record_type: "Marking Labels", group: "Supporting Documents" },
    { record_type: "Other", group: "Supporting Documents" },
    { record_type: "Photo", group: "Supporting Documents" },
    { record_type: "Product Information", group: "Supporting Documents" },
    { record_type: "Schematic Drawing", group: "Supporting Documents" },
    {
      record_type: "3rd Party Certification Report",
      group: "Supporting Documents",
    },
    { record_type: "File Transfer Letter", group: "Supporting Documents" },
  ];

  React.useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, []);

  const handleCategoryDropdownChange = (event, value) => {
    setCategory(value);
  };
  const handleStandardDropdownChange = (event, value) => {
    setStandard(value);
  };

  const [category, setCategory] = React.useState(""); // chosen category
  const [standard, setStandard] = React.useState(""); // chosen standard
  const [standards, setStandards] = React.useState([]); // list of standards based on category
  const [newCompliance, setNewCompliance] = React.useState({});

  const getStandards = data
    .map((s) => s["standard_body"])
    .reduce((prev, curr) => prev.concat(curr), []);

  const getStandardsByCat = data.filter(
    (s) => s["standard_category"] === category
  );

  React.useEffect(() => {
    console.log(category);
    if (category !== "") {
      if (getStandardsByCat[0]) {
        setStandards(getStandardsByCat[0]["standard_body"]);
      }
    }
    if (category === null) {
      setStandards(getStandards);
    }
  }, [category]);

  const handleChange = (name, value) => {
    const newData = { ...newCompliance };
    newData[name] = value;
    setNewCompliance(newData);
    console.log(newData);
  };

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

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
            <div></div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TextField
                label="Regulatory Authority"
                required
                onChange={(event) =>
                  handleChange("regulatory_authority", event.target.value)
                }
              ></TextField>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data.map((standard) => standard["standard_category"])}
                renderInput={(params) => (
                  <TextField {...params} required label="Select Category" />
                )}
                onChange={handleCategoryDropdownChange}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo1"
                name="appliedStandard"
                options={standards}
                renderInput={(params) => (
                  <TextField {...params} required label="Applied Standard" />
                )}
                onChange={(event, value) =>
                  handleChange("applied_standard", value)
                }
              />
              <TextField
                label="Sub-Sections"
                onChange={(event) =>
                  handleChange("sub_sections", event.target.value)
                }
              ></TextField>
              <Autocomplete
                id="grouped-demo"
                options={recordType}
                groupBy={(recordType) => recordType.group}
                getOptionLabel={(recordType) => recordType.record_type}
                renderInput={(params) => (
                  <TextField {...params} required label="Record Type" />
                )}
                onChange={(event, value) => handleChange("record_type", value)}
              />
              <Autocomplete
                id="grouped-demo"
                options={["Published", "Draft"]}
                renderInput={(params) => (
                  <TextField {...params} required label="Status" />
                )}
                onChange={(event, value) => handleChange("status", value)}
              />
              <Autocomplete
                id="grouped-demo"
                options={[auth.user]}
                renderInput={(params) => (
                  <TextField {...params} required label="Originator" />
                )}
                onChange={(event, value) => handleChange("originator", value)}
              />
              <DesktopDatePicker
                label="Compliance Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  handleChange("start_date", newValue);
                }}
                renderInput={(params) => <TextField required {...params} />}
              />
              <DesktopDatePicker
                label="Compliance End Date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  handleChange("end_date", newValue);
                }}
                renderInput={(params) => <TextField required {...params} />}
              />
              <Autocomplete
                limitTags={1}
                id="fixed-tags-demo"
                onChange={(event, value) => handleChange("country", value)}
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
                isOptionEqualToValue={(option, value) =>
                  option.country_name === value.country_name
                }
                renderInput={(params) => (
                  <TextField
                    size="small"
                    label="Country"
                    variant="outlined"
                    required
                    {...params}
                    //placeholder={placeholder}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="outlined" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
