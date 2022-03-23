import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/CustomTable/CustomHeader";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  Paper,
  TableRow,
  Card,
} from "@mui/material";
import CustomTableToolbar from "../../components/CustomTable/CustomTableToolbar";

function ViewSubscribers({ tableData }) {
  const DUMMY_COLUMNS = ["Subscriber Name"];

  return (
    <Card>
      <CustomTableToolbar title="Subscribers" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CustomHeader columns={DUMMY_COLUMNS} />
          <TableBody>
            {/* {tableData.map((p) => (
              <TableRow key={1}>
                <TableCell>{"Mikhail"}</TableCell>
              </TableRow>
            ))} */}
            <TableRow key={1}>
              <TableCell>{"Mikhail"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default ViewSubscribers;
