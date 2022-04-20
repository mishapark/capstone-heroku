import React, { useState, useEffect } from "react";

import CustomHeader from "../../components/CustomTable/CustomHeader";
import {
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    Paper,
    TableRow,
    Card,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ApartmentIcon from "@mui/icons-material/Apartment";

//components
import CustomTableToolbar from "../../components/CustomTable/CustomTableToolbar";
import { PageHeader } from "../../components/Header/PageHeader";

// api
import { getCompanies, deleteCompany } from "../../api/companies";

function ViewSubscribers() {
    const Headers = ["Subscriber Name", ""];

    const [companies, setCompanies] = useState([])


    useEffect(() => {

        getCompanies().then((data) => setCompanies(data))
    }, [])

    const handleDelete = (e, id) => {
        e.preventDefault()

        deleteCompany(id).then((data) => {
            //reload the companies
            getCompanies().then((data) => setCompanies(data))
        })
    }

    return (
        <Card>
            <PageHeader
                icon={<ApartmentIcon />}
                title="Subscriber List"
                description="View the list of subscribers"
            ></PageHeader>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Subscriber Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {companies.map((c) => {
                            return (
                                <TableRow>
                                    <TableCell>{c.company_name}</TableCell>
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
        </Card>
    );
}

export default ViewSubscribers;
