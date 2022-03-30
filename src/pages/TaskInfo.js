import {
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    Autocomplete,
    Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import DatePicker from "react-widgets/esm/DatePicker";
import DropdownList from "react-widgets/DropdownList";
import useAuth from "../hooks/useAuth";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const TaskInfo = () => {
    //use navigate
    const navigate = useNavigate();
    const { id } = useParams();
    const [rfq, setRfq] = useState({
        rfqNumber: id,
        status: "Draft",
        approver: "Timothy",
    });
    const { auth } = useAuth();

    const [signButtonIsDisabled, setSignButtonIsDisabled] = useState(false)

    const sendGetRequest = async () => {
        try {
            const response = await axios.get(
                `https://humber-capstone-backend.herokuapp.com/rfqs/findOne?rfqNumber=${id}`
            );
            console.log(response.data);
            setRfq(response.data);

            // set sign button visibility
            if (response.data.RFQstages === "Completed" || response.data.RFQstages === "Cancelled") {
                setSignButtonIsDisabled(true)
            } else {
                setSignButtonIsDisabled(false)
            }

        } catch (err) {
            console.log(err.message);
        }
    };

    React.useEffect(() => {
        sendGetRequest();
    }, []);

    const handleSubmit = async (e) => {
        // store the states in the form data
        e.preventDefault();
        console.log(rfq);
        try {
            // make axios post request
            const response = await axios({
                method: "put",
                url: `https://humber-capstone-backend.herokuapp.com/RFQs/update?rfqNumber=${id}`,
                data: rfq,
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                },
            }).then(navigate("/rfq"));
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeValue = (event) => {
        setRfq({
            ...rfq,
            [event.target.name]: event.target.value,
        });
        console.log(rfq);
    };

    const handleSelect = (e, value) => {
        setRfq({
            ...rfq,
            ["status"]: value,
        });
        console.log(rfq);
    };

    const handleApprover = (e, value) => {
        setRfq({
            ...rfq,
            ["approver"]: value,
        });
        console.log(rfq);
        console.log(value);
    };

    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const [approvers, setApprovers] = React.useState([]);

    const getApprovers = async () => {
        try {
            const response = await axios.get(
                "https://humber-capstone-backend.herokuapp.com/rfqs/findApprovers"
            );
            console.log(response.data);
            setApprovers(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        sendGetRequest();
        getApprovers();
    }, []);

    const handleDate = (e) => {
        const newData = { ...rfq };
        newData["quoteRequiredBy"] = e;
        setValue(e);
        setRfq(newData);
        console.log(rfq);
    };

    // docusign
    const [docusignUrl, setDocusignUrl] = useState("")
    const handleSignRfq = (event) => {
        //setSignButtonIsDisabled(true)
        // TODO change to actual url and actual client ID
        axios
            .post(
                `https://humber-capstone-backend.herokuapp.com/docusigns`,
                {
                    client_id: "a48595f9-11ad-47d2-8824-e4049b580426",
                    rfq_number: rfq.rfqNumber
                }
            )
            .then((res) => {
                setDocusignUrl(res.data)
                console.log(res.data)
                //window.location.assign(res.data);
                window.open(res.data, "_blank")
            });
    }

    return (
        <Paper>
            <Typography variant="h4" sx={{ padding: 3 }}>
                {rfq.rfqNumber}
            </Typography>
            <Container sx={{ paddingBottom: 5 }} maxWidth="sm">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} sx={{ mt: 5 }}>
                            <TextField
                                id="to"
                                variant="outlined"
                                autoFocus
                                required
                                name="to"
                                size="small"
                                value={rfq.to}
                                onChange={handleChangeValue}
                            />
                            <TextField
                                id="from"
                                variant="outlined"
                                required
                                size="small"
                                name="from"
                                value={rfq.from}
                                onChange={handleChangeValue}
                            />
                            <TextField
                                id="rfq-date"
                                value={rfq.rfqDate}
                                variant="outlined"
                                required
                                disabled
                                size="small"
                            />
                            {console.log(rfq.rfqDate)}

                            <TextField
                                id="vendor-details"
                                variant="outlined"
                                size="small"
                                required
                                name="vendorDetail"
                                value={rfq.vendorDetail}
                                onChange={handleChangeValue}
                            />
                            <DesktopDatePicker
                                label="Date&Time picker"
                                value={value}
                                onChange={(e) => handleDate(e)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Autocomplete
                                disablePortal
                                id="approver"
                                value={rfq.approver}
                                name="approver"
                                onInputChange={(event, value) => handleApprover(event, value)}
                                options={approvers.map((element) => element.userName)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Approver" />
                                )}
                            />
                            <TextField
                                id="description"
                                variant="outlined"
                                multiline
                                rows={5}
                                size="small"
                                name="description"
                                value={rfq.description}
                                onChange={handleChangeValue}
                            >
                                {rfq.description}
                            </TextField>
                            <TextField
                                id="other-instruction"
                                variant="outlined"
                                multiline
                                rows={3}
                                size="small"
                                name="instruction"
                                value={rfq.instruction}
                                onChange={handleChangeValue}
                            />
                            <TextField
                                id="statement"
                                variant="outlined"
                                size="small"
                                name="statement"
                                value={rfq.statement}
                                onChange={handleChangeValue}
                                required
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={["Draft", "Published"]}
                                name="status"
                                value={rfq.status}
                                onInputChange={(e, value) => handleSelect(e, value)}
                                renderInput={(params) => (
                                    <TextField {...params} name="status" label="Status" />
                                )}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={6}>
                                    <Button onClick={handleSignRfq} disabled={signButtonIsDisabled} >Sign RFQ</Button>
                                </Grid>
                                <Grid item xs={8} md={6}>
                                    <Button onClick={() => navigate("/tasks")}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </form>
                </LocalizationProvider>
            </Container>
        </Paper>
    );
};
