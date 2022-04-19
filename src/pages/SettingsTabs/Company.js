import { Box, Paper, Toolbar, Typography, Button } from "@mui/material";
import { React, useState, useEffect } from "react";
import { PageHeader } from "../../components/Header/PageHeader";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// api
import { getCompany, updateCompany } from "../../api/companies";

function Company() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const { auth } = useAuth();
  const [company, setCompany] = useState({});

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    // get company from user
    getCompany(auth.companyId).then((data) => {
      setCompany(data);
      setName(data.company_name);
      setAddress(data.company_address);
      setEmail(data.company_email);
      setTelephone(data.company_phone);
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    let updatedCompany = company;

    updatedCompany.company_name = name;
    updatedCompany.company_address = address;
    updatedCompany.company_email = email;
    updatedCompany.company_phone = telephone;

    updateCompany(updatedCompany._id, updatedCompany).then((data) => {
      console.log(data);
    });
  };

  const handleNameChange = (e, field) => {
    console.log(e.target.value);
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "address") {
      setAddress(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "telephone") {
      setTelephone(e.target.value);
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <PageHeader
            icon={<ApartmentIcon />}
            title="Company Settings"
            description="Current Company Settings"
          ></PageHeader>
          <Divider />
          <br />
          <Grid container spacing={2} style={{ margin: "1em" }}>
            <Grid item xs={3}>
              <Typography>Company Name</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => handleNameChange(e, "name")}
              ></TextField>
            </Grid>
            <Grid item xs={11}>
              <Divider variant="middle"></Divider>
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
                value={address}
                onChange={(e) => handleNameChange(e, "address")}
              ></TextField>
            </Grid>
            <Grid item xs={11}>
              <Divider variant="middle"></Divider>
            </Grid>
            <Grid item xs={3}>
              <Typography>Company Email</Typography>
            </Grid>

            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => handleNameChange(e, "email")}
              ></TextField>
            </Grid>
            <Grid item xs={11}>
              <Divider variant="middle"></Divider>
            </Grid>
            <Grid item xs={3}>
              <Typography>Company Telephone</Typography>
            </Grid>

            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                value={telephone}
                onChange={(e) => handleNameChange(e, "telephone")}
              ></TextField>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8} md={6}>
                <Button type="submit" onClick={handleSave}>
                  Save
                </Button>
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

export default Company;
