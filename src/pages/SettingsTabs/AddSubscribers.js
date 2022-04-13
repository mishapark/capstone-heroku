import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";
import { useNavigate } from "react-router-dom"

import { PageHeader } from "../../components/Header/PageHeader";

// mui
//import { Button } from "@material-ui/core";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@material-ui/core";
import { Box, Paper, Toolbar, Typography, Button, Autocomplete } from "@mui/material";

// api
import { createCompany } from "../../api/companies";
import { getCountries } from "../../api/countries";

function AddSubscribers() {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [companyName, setCompanyName] = useState("");
    const [companyDomain, setCompanyDomain] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCountry, setCompanyCountry] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [engineeringName, setEngineeringName] = useState("");
    const [engineeringPhone, setEngineeringPhone] = useState("");
    const [engineeringEmail, setEngineerEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [complianceName, setComplianceName] = useState("");
    const [compliancePhone, setCompliancePhone] = useState("");
    const [complianceEmail, setComplianceEmail] = useState("");

    const [countries, setCountries] = useState([])

    const handleTextChange = (e, field) => {
        if (field === "companyName") {
            setCompanyName(e.target.value)
        } else if (field === "companyDomain") {
            setCompanyDomain(e.target.value)
        } else if (field === "companyAddress") {
            setCompanyAddress(e.target.value)
        } else if (field === "companyEmail") {
            setCompanyEmail(e.target.value)
        } else if (field === "companyPhone") {
            setCompanyPhone(e.target.value)
        } else if (field === "engineeringName") {
            setEngineeringName(e.target.value)
        } else if (field === "engineeringPhone") {
            setEngineeringPhone(e.target.value)
        } else if (field === "engineeringEmail") {
            setEngineerEmail(e.target.value)
        } else if (field === "businessName") {
            setBusinessName(e.target.value)
        } else if (field === "businessPhone") {
            setBusinessPhone(e.target.value)
        } else if (field === "businessEmail") {
            setBusinessEmail(e.target.value)
        } else if (field === "complianceName") {
            setComplianceName(e.target.value)
        } else if (field === "compliancePhone") {
            setCompliancePhone(e.target.value)
        } else if (field === "complianceEmail") {
            setComplianceEmail(e.target.value)
        }
    }

    const methods = useForm();
    const handleSave = (e) => {
        e.preventDefault()

        let company = {
            "company_name": companyName,
            "company_domain": companyDomain,
            "company_address": companyAddress,
            "company_country": companyCountry,
            "company_phone": companyPhone,
            "company_email": companyEmail,
            "engineering_name": engineeringName,
            "engineering_phone": engineeringPhone,
            "engineering_email": engineeringEmail,
            "business_name": businessName,
            "business_phone": businessPhone,
            "business_email": businessEmail,
            "compliance_name": complianceName,
            "compliance_phone": compliancePhone,
            "compliance_email": complianceEmail
        }

        createCompany(company)
            .then((data) => {
                navigate("/settings/viewsubscribers")
            })

    }

    const handleCountryChange = (val) => {
        setCompanyCountry(val.country_name)
    }

    

    useEffect(() => {
        getCountries().then((data) => setCountries(data));
    }, [])

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%" }}>
                    <PageHeader
                        icon={<ApartmentIcon />}
                        title="New Company"
                        description="Create a new company"
                    ></PageHeader>
                    <Divider />
                    <Grid container spacing={2} style={{ margin: "1em" }}>

                        <Grid item xs={3}>
                            <Typography>Company Name</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={companyName}
                                onChange={(e) => handleTextChange(e, "companyName")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Company Domain</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={companyDomain}
                                onChange={(e) => handleTextChange(e, "companyDomain")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Company Address</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={companyAddress}
                                onChange={(e) => handleTextChange(e, "companyAddress")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Company Country</Typography>
                        </Grid>
                        <Grid item xs={7}>
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
                                        variant="outlined"
                                        {...params}
                                    //placeholder={placeholder}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Company Email</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={companyEmail}
                                onChange={(e) => handleTextChange(e, "companyEmail")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Company Telephone</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={companyPhone}
                                onChange={(e) => handleTextChange(e, "companyPhone")}
                            ></TextField>
                        </Grid>

                        {/* Engineering settings */}
                        <Grid item xs={11}>
                            <Divider variant="middle"></Divider>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Engineering Contact Name</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={engineeringName}
                                onChange={(e) => handleTextChange(e, "engineeringName")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Engineering Contact Telephone</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={engineeringPhone}
                                onChange={(e) => handleTextChange(e, "engineeringPhone")}
                            ></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>Engineering Contact Email</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={engineeringEmail}
                                onChange={(e) => handleTextChange(e, "engineeringEmail")}
                            ></TextField>
                        </Grid>

                        {/* Business settings */}

                        <Grid item xs={11}>
                            <Divider variant="middle"></Divider>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Business Contact Name</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={businessName}
                                onChange={(e) => handleTextChange(e, "businessName")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Business Contact Telephone</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={businessPhone}
                                onChange={(e) => handleTextChange(e, "businessPhone")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Business Contact Email</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={businessEmail}
                                onChange={(e) => handleTextChange(e, "businessEmail")}
                            ></TextField>
                        </Grid>

                        {/* Business settings */}

                        <Grid item xs={11}>
                            <Divider variant="middle"></Divider>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Compliance Contact Name</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={complianceName}
                                onChange={(e) => handleTextChange(e, "complianceName")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Compliance Contact Telephone</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={compliancePhone}
                                onChange={(e) => handleTextChange(e, "compliancePhone")}
                            ></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>Compliance Contact Email</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={complianceEmail}
                                onChange={(e) => handleTextChange(e, "complianceEmail")}                           ></TextField>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={8} md={6}>
                                <Button type="submit" onClick={handleSave}>Save</Button>
                            </Grid>
                            <Grid item xs={8} md={6}>
                                <Button onClick={goBack}> Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    );
}

export default AddSubscribers;
