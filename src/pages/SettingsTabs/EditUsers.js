import React, { useEffect, useState } from "react";

// mui
import {
    Box, Paper, Toolbar, Typography, Button,
    Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Card, IconButton
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";


//components
import { PageHeader } from "../../components/Header/PageHeader";
import CustomHeader from "../../components/CustomTable/CustomHeader";

//hooks
import useAuth from "../../hooks/useAuth";

// api
import { getCompany } from "../../api/companies";
import { getUsersByEmail, getCompanyUsers, deleteCompanyUser, addCompanyUser } from "../../api/companyusers";

function EditUsers() {

    //const Headers = ["Username", "Email", ""];

    const { auth } = useAuth();
    const [company, setCompany] = useState("");
    const [tabValue, setTabValue] = useState("1");
    const [usersByEmail, setUsersByEmail] = useState([]);
    const [companyUsers, setCompanyUsers] = useState([]);

    useEffect(() => {
        getCompany(auth.companyId).then((data) => {
            setCompany(data)

            refreshUsers(data.company_domain)
        })


    }, [])

    const handleTabChange = (event, value) => {
        setTabValue(value);

    };

    const handleDelete = (event, userId) => {
        event.preventDefault()
        deleteCompanyUser(company._id, userId).then((data) => {
            refreshUsers(company.company_domain)
        })
    }

    const handleAdd = (event, userId) => {
        event.preventDefault()
        addCompanyUser(company._id, userId).then((data) => {
            refreshUsers(company.company_domain)
        })
    }

    const refreshUsers = (domain) => {
        getUsersByEmail(domain)
            .then((data) => {
                let noCompanyUsers = data.filter((d) => !d.company_id)
                setUsersByEmail(noCompanyUsers)
            })
        getCompanyUsers(auth.companyId).then((data) => setCompanyUsers(data))

    }

    return (

        <div>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%" }}>
                    <PageHeader
                        icon={<ApartmentIcon />}
                        title="Edit Users"
                        description="Add/Remove user's subscriber access"
                    ></PageHeader>
                    <Divider />

                    <TabContext value={tabValue}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                            centered
                        >
                            <Tab value="1" label="Users with Access" />
                            <Tab value="2" label="Users without Access" />
                        </Tabs>

                        <TabPanel value="1">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {companyUsers.map((c) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{c.userName}</TableCell>
                                                    <TableCell>{c.userEmail}</TableCell>
                                                    <TableCell>
                                                        <IconButton color="primary" onClick={(e) => handleDelete(e, c._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>

                        <TabPanel value="2">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {usersByEmail.map((c) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{c.userName}</TableCell>
                                                    <TableCell>{c.userEmail}</TableCell>
                                                    <TableCell>
                                                        <IconButton color="primary" onClick={(e) => handleAdd(e, c._id)}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Box>
        </div>

    );
}

export default EditUsers;
