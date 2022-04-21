import React from "react";
import { Table } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";

export const GeneralTable = ({ headers, data }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow key={1}>
            {headers.map((header) => {
              <TableCell key={2}>Lol</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => {
            <TableRow key={2}>
              <TableCell key={d.id}>{d.name}</TableCell>
            </TableRow>;
          })}
          <TableRow>
            <TableCell>TEST</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
