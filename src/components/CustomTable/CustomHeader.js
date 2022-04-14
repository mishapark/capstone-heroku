import React from "react";
import { TableSortLabel, TableCell, TableHead, TableRow } from "@mui/material";
import { FormattedMessage } from "react-intl";

function CustomHeader({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell key={headCell} align="left" padding="normal">
            <TableSortLabel>
              {<FormattedMessage id={headCell} />}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomHeader;
