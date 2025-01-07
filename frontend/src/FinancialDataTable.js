import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function FinancialDataTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">Net Income</TableCell>
            <TableCell align="right">Gross Profit</TableCell>
            <TableCell align="right">EPS</TableCell>
            <TableCell align="right">Operating Income</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.Date}
              </TableCell>
              <TableCell align="right">{row.Revenue}</TableCell>
              <TableCell align="right">{row.NetIncome}</TableCell>
              <TableCell align="right">{row.GrossProfit}</TableCell>
              <TableCell align="right">{row.EPS}</TableCell>
              <TableCell align="right">{row.OperatingIncome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialDataTable;
