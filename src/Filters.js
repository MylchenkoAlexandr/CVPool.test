import React, { useState } from "react";
import {
  Paper,
  Box,
  Chip,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import uniqueId from "lodash/uniqueId";

export default function Filters() {
  const [chips, setChips] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterKeyDown = (event) => {
    if (event.key === "Enter" && filterValue) {
      setChips([...chips, { id: uniqueId(), value: filterValue }]);
      setFilterValue("");
    }

    if (event.key === "Escape") {
      setFilterValue("");
    }
  };

  const deleteChip = (id) => {
    setChips(chips.filter((chip) => chip.id !== id));
  };

  const handleFilterChange = ({ target }) => {
    setFilterValue(target.value);
  };

  return (
    <Paper elevation={2} square>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item container wrap="nowrap" xs={10} alignItems="center">
          <Box mx={2}>
            <Typography>Names:</Typography>
          </Box>
          {chips.length > 0 && (
            <Grid item>
              {chips.map(({ id, value }) => (
                <Box m={1} component="span" key={id}>
                  <Chip label={value} onDelete={() => deleteChip(id)} />
                </Box>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Enter name"
            value={filterValue}
            onChange={handleFilterChange}
            onKeyDown={handleFilterKeyDown}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
