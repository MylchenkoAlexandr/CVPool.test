import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Filters from "./Filters";
import mockData from "./mockData";

export default function Staff() {
  const [staff] = useState(mockData);

  const handleSort = () => {
    alert("Not implemented");
  };

  return (
    <>
      <Filters />
      <Box my={6} />
      <Paper elevation={2} square>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["name", "email", "date", "company", "city"].map(
                  (columnName) => (
                    <TableCell key={columnName}>
                      <TableSortLabel
                        onClick={handleSort}
                        component={Typography}
                        IconComponent={ArrowDropDownIcon}
                      >
                        {columnName}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.map((row, i) => (
                <TableRow hover key={`${row.name}-${i}`}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.data}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
