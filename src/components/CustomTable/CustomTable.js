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
import axios from "axios";

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

function CustomTable({ tableData, setRequestData }) {
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState();

  const handleDelete = async (id) => {
    await axios
      .delete(
        `https://humber-capstone-backend.herokuapp.com/products/delete?product_id=${id}`
      )
      .then(() => setRequestData(new Date()));
  };

  return (
    <>
      <CustomTableToolbar title="Products" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CustomHeader columns={DUMMY_COLUMNS} />
          <TableBody>
            {tableData.map((p) => (
              <TableRow key={p["_id"]}>
                <TableCell>
                  {p["product_details"]["product_name"]
                    ? p["product_details"]["product_name"]
                    : "-"}
                </TableCell>
                <TableCell>
                  {p["product_details"]["product_family"]
                    ? p["product_details"]["product_family"]
                    : "-"}
                </TableCell>
                <TableCell>
                  {p["product_details"]["product_category"]
                    ? p["product_details"]["product_category"]
                    : "-"}
                </TableCell>
                <TableCell>
                  {p["product_details"]["applicable_standard"]
                    ? p["product_details"]["applicable_standard"]
                    : "-"}
                </TableCell>
                <TableCell>
                  {p.last_updated_status.last_updated_date
                    .toString()
                    .slice(0, 10)}
                </TableCell>
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
                      setEditContent(p);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleDelete(p.product_id)}
                  >
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
          setRequestData={setRequestData}
        />
      </Dialog>
    </>
  );
}

export default CustomTable;
