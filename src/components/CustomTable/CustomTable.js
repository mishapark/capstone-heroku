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
  Dialog,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import CustomTableToolbar from "./CustomTableToolbar";
import DialogCustom from "../../components/Dialog/DialogCustom";
import { Link } from "react-router-dom";

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
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState();

  return (
    <>
      <CustomTableToolbar title="Products" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CustomHeader columns={DUMMY_COLUMNS} />
          <TableBody>
            {tableData.map((p) => (
              <TableRow key={p["_id"]}>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>{p["product_details"]["product_name"]}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Link to={`${p._id}`}>
                      <PageviewIcon />
                    </Link>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      setOpen(true);
                      setEditContent(p);
                    }}
                  >
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogCustom
          title="Edit Product"
          onClose={() => setOpen(false)}
          editContent={editContent}
        />
      </Dialog>
    </>
  );
}

export default CustomTable;
