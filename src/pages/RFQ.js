import React from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Card, Stack } from "@mui/material";
import { TextField } from "@material-ui/core";
import { Box} from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Tooltip } from "chart.js";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Table } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
export const RFQ = () => {
  const [openForm, setOpenForm] = useState("false");

  return (
    <>
      <Card
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Button
            onClick={() => setOpenForm((prev) => !prev)}
            variant="contained"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
            Create
          </Button>
        </Card>
        {openForm && (
      <Box sx={{ width: "100%", mb:5 }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              RFQ Manager
            </Typography>
          </Toolbar>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <Box textAlign="center">
                
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              
            </Grid>
              <Grid item xs={12} md={8} >
                <form>
                  <Stack spacing={2} sx={{ padding: 5, maxWidth:'700px' }}>
                    <TextField
                      id="to"
                      label="To"
                      variant="outlined"
                      autoFocus
                      required
                      size="small"
                    />
                    <TextField
                      id="from"
                      label="From"
                      variant="outlined"
                      required
                      size="small"
                    />
                    <TextField
                      id="rfq-date"
                      label="RFQ Date"
                      variant="outlined"
                      required
                      disabled
                      size="small"
                    />
                    <TextField
                      id="rfq-number"
                      label="RFQ Number"
                      variant="outlined"
                      disabled
                      size="small"
                      required
                    />
                    <TextField
                      id="vendor-details"
                      label="Vendor Details"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <TextField
                      id="quote-req"
                      label="Quote Required By"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <TextField
                      id="authorized-person"
                      label="Authorized Person"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={5}
                      size="small"
                      required
                    />
                    <TextField
                      id="other-instruction"
                      label="Any Other Instructions For Quoting"
                      variant="outlined"
                      multiline
                      rows={3}
                      size="small"
                    />
                    <TextField
                      id="statement"
                      label="Statement For Qualification"
                      variant="outlined"
                      size="small"
                      required
                    />
                    <Grid container>
                      <Grid xs={11}></Grid>
                      <Grid xs={1}>
                        <Button variant="contained" type="submit">
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </Stack>
                </form>
              </Grid>
          </Grid>
        </Paper>
      </Box>
      )}
      <Box sx={{ width: "100%", mt:2}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Table className="mb-0">
      <TableHead>
        <TableRow>
            <TableCell key={1} sx={{'fontWeight':'bold'}}>Product name</TableCell>
            <TableCell key={2} sx={{'fontWeight':'bold'}}>Compliance status</TableCell>
            <TableCell key={3} sx={{'fontWeight':'bold'}}>Documents</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell>Test1</TableCell>
            <TableCell>
             Test1
            </TableCell>
            <TableCell>Test1</TableCell>
          </TableRow>
      </TableBody>
    </Table>
      </Paper>
    </Box>
    </>
  );
};
