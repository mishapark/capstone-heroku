import React from 'react'
import { Table } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableBody } from "@material-ui/core";

export const GeneralTable = ({headers, data}) => {
    
  return (
    <>
    {console.log(headers)}
        <Table>
            <TableHead>
                <TableRow key={1}>
                {headers.map((header) => {
                    <TableCell key={2}>Lol</TableCell>
                })}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((d) => {
                    <TableRow key={2}>
                        <TableCell key={d.id}>{d.name}</TableCell>
                    </TableRow>
                })}
                <TableRow>
                        <TableCell>TEST</TableCell>
                    </TableRow>
            </TableBody>
        </Table>
    </>
  )
}
