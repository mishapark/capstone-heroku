import {
  Stack,
  TextField,
  Autocomplete,
  Grid,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/lab";
import React from "react";

export const RFQForm = ({
  rfq,
  handleChangeValue,
  handleDate,
  value,
  approvers,
  handleSelect,
  handleApprover,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2">Person Information</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <TextField
              id="to"
              variant="outlined"
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
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">RFQ Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <TextField
              id="rfq-date"
              value={rfq.rfqDate}
              variant="outlined"
              required
              disabled
              size="small"
            />
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
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">RFQ Status</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
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
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
