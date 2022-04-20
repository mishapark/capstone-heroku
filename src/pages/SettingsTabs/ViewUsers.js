import React, { useEffect, useState } from "react";

// mui
import {
    Box, Paper, Toolbar, Typography, Button,
    Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Card, IconButton
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";


//components
import { PageHeader } from "../../components/Header/PageHeader";
import CustomHeader from "../../components/CustomTable/CustomHeader";

//hooks
import useAuth from "../../hooks/useAuth";

// api
import { getCompany } from "../../api/companies";
import { getUsersByEmail, getCompanyUsers, deleteCompanyUser, addCompanyUser } from "../../api/companyusers";

function ViewUsers() {
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
                        title="User List"
                        description="View a list of users"
                    ></PageHeader>
                    <Divider />


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
                                                <IconButton color="primary" onClick={(e) => handleDelete(e, c._id)} size="large">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
            </Paper>
        </Box>
        </div >
    );
}

export default ViewUsers;
