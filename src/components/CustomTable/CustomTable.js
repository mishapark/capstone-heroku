import React, { useEffect, useState } from "react";
import CustomHeader from "./CustomHeader";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  Paper,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import CustomTableToolbar from "./CustomTableToolbar";

const DUMMY_COLUMNS = [
  "Product Name",
  "Product Family",
  "Category",
  "Category Standard",
  "Start Date",
  "View",
  "Edit",
  "Delete",
];

function CustomTable({ tableData }) {
  return (
    <>
      <CustomTableToolbar title="Products" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CustomHeader columns={DUMMY_COLUMNS} />
          <TableBody>
            {tableData.map((p) => (
              <TableRow>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <PageviewIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomTable;
