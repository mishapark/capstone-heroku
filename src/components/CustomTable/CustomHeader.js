import React from "react";
import { TableSortLabel, TableCell, TableHead, TableRow } from "@mui/material";

function CustomHeader({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell key={headCell} align="left" padding="normal">
            <TableSortLabel>{headCell}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomHeader;
