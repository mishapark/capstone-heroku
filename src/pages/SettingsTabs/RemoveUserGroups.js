import React from "react";
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

function RemoveUserGroups() {
  const DUMMY_COLUMNS = ["User Group Name", "Delete"];

  return (
    <Card>
      <CustomTableToolbar title="Remove User Groups" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CustomHeader columns={DUMMY_COLUMNS} />
          <TableBody>
            {/* {tableData.map((p) => (
          <TableRow key={1}>
            <TableCell>{"Mikhail"}</TableCell>
          </TableRow>
        ))} */}
            <TableRow>
              <TableCell>{"Mikhail"}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RemoveUserGroups;
