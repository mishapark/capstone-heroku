import React, { useEffect, useState } from "react";

// mui
import {
    Box, Paper, Toolbar, Typography, Button,
    Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Card, IconButton
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete";
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
import { getCompany, getCompanies } from "../../api/companies";
import { getUsersByEmail, getCompanyUsers, deleteCompanyUser, addCompanyUser } from "../../api/companyusers";
import { getUsers, updateUserRole } from "../../api/users";


function EditUsers() {
    //const Headers = ["Username", "Email", ""];

    const { auth } = useAuth();
    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);
    const [companyUsers, setCompanyUsers] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    useEffect(() => {

        // if user is super admin, allow filtering on subscribers
        if (auth.roles.indexOf("Super_Admin") > -1) {
            setIsSuperAdmin(true)
            // get list of all companies
            getCompanies().then((data) => {
                setCompanies(data)
            })

            // on initial load, set companyUsers to be all the users in the system
            getUsers().then((data) => {
                setCompanyUsers(data)
            })

        } else {
            getCompany(auth.companyId).then((data) => {
                setCompany(data)
                getCompanyUsers(data._id).then((data) => {
                    setCompanyUsers(data)
                })
            })
        }


    }, [])

    const refreshUsers = (domain) => {
        getUsersByEmail(domain)
            .then((data) => {
                let noCompanyUsers = data.filter((d) => !d.company_id)
                setUsersByEmail(noCompanyUsers)
            })
        getCompanyUsers(auth.companyId).then((data) => setCompanyUsers(data))

    }

    const handleSubscriberChange = (event, val) => {

        if (val) {
            let chosenCompany = companies.filter((c) => c.company_name === val)[0]

            // set company
            setCompany(chosenCompany)

            getCompanyUsers(chosenCompany._id).then((data) => {
                setCompanyUsers(data)
            })
        }

        // super admin removed the filter
        if (isSuperAdmin && !val) {
            setCompany("")
            getUsers().then((data) => {
                setCompanyUsers(data)
            })

        }
    }

    const handleAccessChange = (event, val, userId) => {
        if (val) {
            let chosenCompany = companies.filter((c) => c.company_name === val)[0]

            addCompanyUser(chosenCompany._id, userId).then((data) => {

            })
        }
    }

    return (

        <div>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%" }}>
                    <PageHeader
                        icon={<ApartmentIcon />}
                        title="Edit User Access"
                        description="Edit users in subscribers"
                    ></PageHeader>
                    <Divider />

                    {isSuperAdmin &&
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={companies.map((c) => c.company_name)}
                                sx={{ width: 300, m: 1 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Subscriber" />
                                )}
                                onChange={(e, v) => handleSubscriberChange(e, v)}
                            />
                        </Box>
                    }

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width="33%">Username</TableCell>
                                    <TableCell width="33%">Email</TableCell>
                                    <TableCell width="33%">Subscriber</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {companyUsers.map((u) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{u.userName}</TableCell>
                                            <TableCell>{u.userEmail}</TableCell>
                                            <TableCell>
                                                {u.company_id &&
                                                    <Autocomplete
                                                        disablePortal
                                                        value={companies.filter((c) => c._id == u.company_id)[0].company_name}
                                                        id={u._id}
                                                        options={companies.map((c) => c.company_name)}
                                                        sx={{ width: 300, m: 1 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Select Access" />
                                                        )}
                                                        onChange={(e, v) => handleAccessChange(e, v, u._id)}
                                                    />
                                                }

                                                {!u.company_id &&
                                                    <Autocomplete
                                                        disablePortal
                                                        id={u._id}
                                                        options={companies.map((c) => c.company_name)}
                                                        sx={{ width: 300, m: 1 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Select Access" />
                                                        )}
                                                        onChange={(e, v) => handleAccessChange(e, v, u._id)}
                                                    />
                                                }

                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    );
}

export default EditUsers;
