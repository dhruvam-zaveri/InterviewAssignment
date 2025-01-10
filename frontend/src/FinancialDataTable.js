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
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import "./App.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function FinancialDataTable({ data, ticker }) {
  return (
    <>
      <p
        style={{ fontSize: "1.5em", fontWeight: 600, textAlign: "center" }}
        className="text-3xl text-white"
      >
        Showing data for {ticker}
      </p>

      <TableContainer
        component={Paper}
        sx={{ width: "80vw", margin: "auto" }}
        // className="scrollbar-thin scrollbar-track-scrollbarTrack scrollbar-thumb-scrollbar"
        className="always-visible-scrollbar"
      >
        <Table stickyHeader>
          <TableHead
            sx={{ "& .MuiTableRow-root": { bgcolor: "primary.main" } }}
          >
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ fontWeight: 700 }}
                style={{ position: "sticky", left: 0, zIndex: 100 }}
              >
                Date
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 700 }}>
                Revenue
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 700 }}>
                Net Income
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 700 }}>
                Gross Profit
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 700 }}>
                EPS
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 700 }}>
                Operating Income
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{
                    position: "sticky",
                    left: 0,
                    background: "grey",
                    zIndex: 100,
                  }}
                >
                  {row.Date}
                </TableCell>
                <TableCell align="center">{row.Revenue}</TableCell>
                <TableCell align="center">{row.NetIncome}</TableCell>
                <TableCell align="center">{row.GrossProfit}</TableCell>
                <TableCell align="center">{row.EPS}</TableCell>
                <TableCell align="center">{row.OperatingIncome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FinancialDataTable;
