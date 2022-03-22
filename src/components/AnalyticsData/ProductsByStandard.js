import React, { useEffect, useState } from "react";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from "axios";


function ProductsByStandard({ title, data }) {

    const [category, setCategory] = useState(""); // chosen category
    const [standard, setStandard] = useState(""); // chosen standard
    const [standards, setStandards] = useState([]); // list of standards based on category
    const [reportResults, setReportResults] = useState([]) // results from run report
    const [resultsIsVisible, setResultsIsVisible] = useState(false) // results from run report

    const getStandards = data
        .map((s) => s["standard_body"])
        .reduce((prev, curr) => prev.concat(curr), []);
    const getStandardsByCat = data.filter(
        (s) => s["standard_category"] === category
    );

    const handleCategoryDropdownChange = (event, value) => {
        setCategory(value)

    }
    const handleStandardDropdownChange = (event, value) => {
        setStandard(value)

    }

    useEffect(() => {
        console.log(category)
        if (category !== "") {
            if (getStandardsByCat[0]) {
                setStandards(getStandardsByCat[0]["standard_body"]);
            }
        }
        if (category === null) {
            setStandards(getStandards);
        }
    }, [category]);

    const handleRunReport = (event) => {
        console.log(category)
        console.log(standard)

        // call api
        axios
            .get(
                `https://humber-capstone-backend.herokuapp.com/products/category`,
                { params: { id: category, standard: standard } }
            )
            .then((res) => {
                setReportResults(res.data)
                setResultsIsVisible(true)
            });
    }

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'center',
            }}>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={data.map((standard) => standard["standard_category"])}
                    sx={{ width: 300, m: 1 }}
                    renderInput={(params) => <TextField {...params} label="Select Category" />}
                    onChange={handleCategoryDropdownChange}
                />


                <Autocomplete
                    disablePortal
                    id="combo-box-demo1"
                    options={standards}
                    sx={{ width: 300, m: 1 }}
                    renderInput={(params) => <TextField {...params} label="Select Standards" />}
                    onChange={handleStandardDropdownChange}
                />

                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleRunReport}>
                    Run Report
                </Button>
            </Box>
            {resultsIsVisible &&
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportResults.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <a href={"/products/" + row._id} target="_blank">{row.product_details.product_name}</a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            }

        </>
    );
}

export default ProductsByStandard;
