import React, { useEffect, useState, Fragment } from "react";

import { Doughnut, Line, Pie } from "react-chartjs-2";

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

import { getRfqsWithToken } from "../../api/rfqs";
import { set } from "date-fns";

// hooks
import useAuth from "../../hooks/useAuth";


function RfqOverviewByStatus() {

    // auth
    const { auth } = useAuth();

    const [rfqs, setRfqs] = useState([]);
    const [resultsIsVisible, setResultsIsVisible] = useState(false)
    const [initiatedData, setInitiatedData] = useState([]);
    const [inProgressData, setInProgressData] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    const [doughnutData, setDoughnutData] = useState({});

    const [reportResults, setReportResults] = useState([]) // results from doughut click

    useEffect(() => {
        getRfqsWithToken(auth.accessToken).then((data) => {
            setRfqs(data)

            const initiated = data.filter((d) => d.RFQstages === "Initiated")
            const inProgress = data.filter((d) => d.RFQstages === "Processing")
            const completed = data.filter((d) => d.RFQstages === "Completed")

            setInitiatedData(initiated)
            setInProgressData(inProgress)
            setCompletedData(completed)
            setDoughnutData({
                labels: ["Initiated", "In progress", "Completed"],
                datasets: [
                    {
                        data: [initiated.length, inProgress.length, completed.length],
                        backgroundColor: ["orange", "green", "blue"],
                    },
                ],
            })
        })
    }, []);

    const option = {
        title: {
            text: "RFQs",
        },
    };

    function handleDoughnutChartOnclick(event, element) {

        if (element[0]) {
            setResultsIsVisible(true)
            if (element[0]._index === 0) {
                setReportResults(initiatedData)

            } else if (element[0]._index === 1) {
                setReportResults(inProgressData)

            } else if (element[0]._index === 2) {
                setReportResults(completedData)
            }
        }



    }

    return <>
        <Box>
            <Doughnut data={doughnutData} option={option} height="200px"
                width="200px"
                options={{
                    maintainAspectRatio: false,
                    onClick: function (event, element) {
                        handleDoughnutChartOnclick(event, element)
                    }
                }} />
        </Box>
        {resultsIsVisible &&
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} width="33%">RFQ Number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} width="33%">Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} width="33%">RFQ Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {reportResults.map((row) => (

                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">
                                        <a href={"/rfq/" + row.rfqNumber} target="_blank">{row.rfqNumber}</a>
                                    </TableCell>
                                    <TableCell component="th" scope="row">{row.description}</TableCell>
                                    <TableCell component="th" scope="row">{row.rfqDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}/)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>

            </Box>
        }
    </>;


}

export default RfqOverviewByStatus;