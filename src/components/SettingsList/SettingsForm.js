import { Box, Paper, Toolbar, Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { PageHeader } from "../../components/Header/PageHeader";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Button, Divider, Grid, TextField } from "@material-ui/core";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"

// api
import { getCompany, updateCompany } from "../../api/companies";

function SettingsForm({ settingName }) {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const { auth } = useAuth();
    const [company, setCompany] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")

    useEffect(() => {
        // get company from user
        getCompany(auth.companyId)
            .then((data) => {
                setCompany(data)

                if (settingName === "engineering") {
                    setDetails(data.engineering_name, data.engineering_email, data.engineering_phone)
                } else if (settingName === "business") {
                    setDetails(data.business_name, data.business_email, data.business_phone)
                } else if (settingName === "compliance") {
                    setDetails(data.compliance_name, data.compliance_email, data.compliance_phone)
                }

            })
    }, []);

    const setDetails = (n, e, p) => {
        setName(n)
        setEmail(e)
        setTelephone(p)
    }

    const handleNameChange = (e, field) => {
        
        if (field === "name") {
            setName(e.target.value)
        } else if (field === "email") {
            setEmail(e.target.value)
        } else if (field === "telephone") {
            setTelephone(e.target.value)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()

        let updatedCompany = company

        if (settingName === "engineering") {
            updatedCompany.engineering_name = name
            updatedCompany.engineering_email = email
            updatedCompany.engineering_phone = telephone
        } else if (settingName === "business") {
            updatedCompany.business_name = name
            updatedCompany.business_email = email
            updatedCompany.business_phone = telephone

        } else if (settingName === "compliance") {
            updatedCompany.compliance_name = name
            updatedCompany.compliance_email = email
            updatedCompany.compliance_phone = telephone

        }
        console.log(updatedCompany)
        updateCompany(updatedCompany._id, updatedCompany)
            .then((data) => {
                console.log(data)
            })

    }

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2} style={{ margin: "1em" }}>
                    <Grid item xs={3}>
                        <Typography>Contact Name</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            variant="outlined"
                            value={name}
                            onChange={(e) => handleNameChange(e, "name")}
                            fullWidth
                        ></TextField>
                    </Grid>

                    <Grid item xs={11}>
                        <Divider variant="middle"></Divider>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Contact's Email</Typography>
                    </Grid>

                    <Grid item xs={7}>
                        <TextField
                            variant="outlined"
                            value={email}
                            onChange={(e) => handleNameChange(e, "email")}
                            fullWidth></TextField>
                    </Grid>
                    <Grid item xs={11}>
                        <Divider variant="middle"></Divider>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Contact's Telephone</Typography>
                    </Grid>

                    <Grid item xs={7}>
                        <TextField
                            variant="outlined"
                            value={telephone}
                            onChange={(e) => handleNameChange(e, "telephone")}
                            fullWidth
                        ></TextField>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6}>
                            <Button type="submit" onClick={handleSave}>Save</Button>
                        </Grid>
                        <Grid item xs={8} md={6}>
                            <Button onClick={goBack}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SettingsForm;
