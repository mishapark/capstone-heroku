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
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={4}>
          <Typography variant="body2" sx={{ textAlign: "right" }}>
            Person Information
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2} sx={{ width: "80%" }}>
            <TextField
              id="to"
              variant="outlined"
              required
              name="to"
              size="small"
              value={rfq.to}
              onChange={handleChangeValue}
              label="To"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="from"
              variant="outlined"
              required
              size="small"
              name="from"
              value={rfq.from}
              onChange={handleChangeValue}
              label="From"
              InputLabelProps={{ shrink: true }}
            />
            <Autocomplete
              disablePortal
              id="approver"
              value={rfq.approver}
              name="approver"
              size="small"
              onInputChange={(event, value) => handleApprover(event, value)}
              options={approvers.map((element) => element.userName)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Approver"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" sx={{ textAlign: "right" }}>
            RFQ Details
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2} sx={{ width: "80%" }}>
            <TextField
              id="rfq-date"
              value={rfq.rfqDate}
              variant="outlined"
              disabled
              size="small"
              label="Date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="vendor-details"
              variant="outlined"
              size="small"
              required
              name="vendorDetail"
              value={rfq.vendorDetail}
              onChange={handleChangeValue}
              label="Vendor Details"
              InputLabelProps={{ shrink: true }}
            />
            <DesktopDatePicker
              value={value}
              onChange={(e) => handleDate(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Date & Time"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <TextField
              id="description"
              variant="outlined"
              multiline
              rows={5}
              size="small"
              name="description"
              required
              value={rfq.description}
              onChange={handleChangeValue}
              label="Description"
              InputLabelProps={{ shrink: true }}
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
              label="Other Functions"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="statement"
              variant="outlined"
              size="small"
              name="statement"
              value={rfq.statement}
              onChange={handleChangeValue}
              required
              label="Statement"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" sx={{ textAlign: "right" }}>
            RFQ Status
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2} sx={{ width: "80%" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Draft", "Published"]}
              name="status"
              value={rfq.status}
              onInputChange={(e, value) => handleSelect(e, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="status"
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
