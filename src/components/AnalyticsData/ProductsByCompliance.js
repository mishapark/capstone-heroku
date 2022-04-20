import React, { useEffect, useState, Fragment } from "react";

import { Doughnut, Line, Pie } from "react-chartjs-2";

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
import { getProductsWithToken } from "../../api/products";
import { getCompliances } from "../../api/compliances";

// hooks
import useAuth from "../../hooks/useAuth";

function ProductsByCompliance() {
    // auth
    const { auth } = useAuth();

    const option = {
        title: {
            text: "Compliance",
        },
    };

    const [compliances, setCompliances] = useState([]);
    const [compliantData, setCompliantData] = useState([]);
    const [nonCompliantData, setNonCompliantData] = useState([]);
    const [pieData, setPieData] = useState({})

    const [reportResults, setReportResults] = useState([]) // results from pie chart click
    const [resultsIsVisible, setResultsIsVisible] = useState(false)
    
    useEffect(() => {
        
        getProductsWithToken(auth.accessToken).then((data) => {
            const compliant = data.filter((d) => d.is_compliant == true)
            const nonCompliant = data.filter((d) => d.is_compliant == false)

            setCompliantData(compliant)
            setNonCompliantData(nonCompliant)
            setPieData({
                labels: ["Compliant", "Non Compliant"],
                datasets: [
                    {
                        data: [compliant.length, nonCompliant.length],
                        backgroundColor: ["green", "red"],
                    },
                ],
            })
        });

        getCompliances().then((data) => {
            setCompliances(data)
        });

    }, []);

    function handlePieChartOnclick(event, element) {
        //console.log(element[0])
        if (element[0]) {
            setResultsIsVisible(true)
            if (element[0]._index === 0) {
                setReportResults(compliantData)
                console.log(compliantData)

            } else if (element[0]._index === 1) {
                setReportResults(nonCompliantData)
            }
        }

    }

    return <>
        <Box>
            <Pie data={pieData} option={option} height="200px"
                width="200px"
                options={{
                    maintainAspectRatio: false,
                    onClick: function (event, element) {
                        handlePieChartOnclick(event, element)
                    }
                }} />
        </Box>

        {resultsIsVisible &&
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} width="33%">Product Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} width="33%">Compliance Report Number(s)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} width="33%">Expiry Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportResults.map((row) => {
                                // if there are no mappings, return empty table cells
                                if (row.compliance_report_number.length == 0) {
                                    return (

                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <a href={"/products/" + row._id} target="_blank">{row.product_details.product_name}</a>
                                            </TableCell>
                                            <TableCell component="th" scope="row"></TableCell>
                                            <TableCell component="th" scope="row"></TableCell>
                                        </TableRow>
                                    )
                                }

                                // otherwise, get the compliance numbers and expiry dates
                                return (
                                    <Fragment>
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" rowSpan={row.compliance_report_number.length + 1}>
                                                <a href={"/products/" + row._id} target="_blank">{row.product_details.product_name}</a>

                                            </TableCell>
                                        </TableRow>

                                        {row.compliance_report_number.map((r) => {

                                            const complianceReport = compliances.filter((c) => c["report_number"] === r)

                                            if (complianceReport.length === 0) {
                                                return (< TableRow >
                                                    <TableCell>{r}</TableCell>
                                                    <TableCell>{ }</TableCell>
                                                </TableRow>)
                                            } else {
                                                return (
                                                    < TableRow >
                                                        <TableCell>{r}</TableCell>
                                                        <TableCell>{complianceReport[0].end_date.match(/^\d{4}\-\d{1,2}\-\d{1,2}/)}</TableCell>
                                                    </TableRow>
                                                );
                                            }

                                        })}
                                    </Fragment>
                                );

                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        }


    </>;
}

export default ProductsByCompliance;