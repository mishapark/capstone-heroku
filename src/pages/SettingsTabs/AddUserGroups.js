import React, { useEffect, useState } from "react";

// mui
import {
    Box, Paper, Toolbar, Typography, Button,
    Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Card, IconButton
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Grid, TextField } from "@material-ui/core";


//components
import { PageHeader } from "../../components/Header/PageHeader";

//hooks
import useAuth from "../../hooks/useAuth";

// api
import { getCompany, getCompanies } from "../../api/companies";
import { getUsersByEmail, getCompanyUsers, deleteCompanyUser, addCompanyUser } from "../../api/companyusers";
import { updateUserRole } from "../../api/users";

function AddUserGroups() {
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

        } else {
            getCompany(auth.companyId).then((data)=> {
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
    }

    const handleAccessChange = (event, val, userEmail) => {

        // get user info
        let user = {
            "role": val,
            "userEmail": userEmail
        }
        // update user's role
        updateUserRole(user).then((data) => {
            getCompanyUsers(company._id).then((data) => {
                setCompanyUsers(data)
            })
        })
    }

    return (

        <div>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%" }}>
                    <PageHeader
                        icon={<ApartmentIcon />}
                        title="Add User Groups"
                        description="Add user group permissions to subscriber users"
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
                                    <TableCell width="33%"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {companyUsers.map((u) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{u.userName}</TableCell>
                                            <TableCell>{u.userEmail}</TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    disablePortal
                                                    value={u.role}
                                                    id={u._id}
                                                    options={['Super_Admin', 'Admin', 'Author', 'Viewer', 'Reviewer', 'Approver']}
                                                    sx={{ width: 300, m: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Select Access" />
                                                    )}
                                                    onChange={(e, v) => handleAccessChange(e, v, u.userEmail)}
                                                />
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

export default AddUserGroups;
