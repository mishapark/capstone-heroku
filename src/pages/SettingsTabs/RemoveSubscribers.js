import React, { useState, useEffect } from "react";

import CustomHeader from "../../components/CustomTable/CustomHeader";
import {
    Table,
    TableBody,
    TableContainer,
    TableCell,
    Paper,
    TableRow,
    Card,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTableToolbar from "../../components/CustomTable/CustomTableToolbar";

// api
import { getCompanies } from "../../api/companies";

function RemoveSubscribers() {
    const Headers = ["Subscriber Name", ""];

    const [companies, setCompanies] = useState([])


    useEffect(() => {

        getCompanies().then((data) => setCompanies(data))
    })

    return (
        <Card>
            <CustomTableToolbar title="Remove Subscribers" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <CustomHeader columns={Headers} />
                    <TableBody>

                        {companies.map((c) => {
                            return (
                                <TableRow>
                                    <TableCell>{c.company_name}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" size="large">
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

export default RemoveSubscribers;
