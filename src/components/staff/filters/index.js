import React, {useEffect, useState} from "react";
import {Box, Chip, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {isEmpty, uniqueId} from "lodash";
import {KEYBOARD_KEYS} from "../../../common/constants";

export default function Filters({onFilter, onSearch}) {
    const [chips, setChips] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const deleteChip = (id) => {
        setChips(chips.filter((chip) => chip.id !== id));
    };
    const onKeyDownHandler = ({key}) => {
        switch (key) {
            case KEYBOARD_KEYS.ESCAPE: {
                break;
            }
            case KEYBOARD_KEYS.ENTER: {
                const val = `${filterValue || ""}`.trim();
                if (isEmpty(val)) return;
                setChips((prev) => [...prev, {id: uniqueId(), value: val}]);
                break;
            }
            default: {
                return
            }
        }

        setFilterValue("");
    };
    const onFilterChangeHandler = ({target}) => {
        setFilterValue(target.value);
    };

    useEffect(() => (onFilter && onFilter(chips)), [chips]);
    useEffect(() => (onSearch && onSearch(filterValue)), [filterValue]);

    const dataset = chips.length > 0 && (
        <Grid item>
            {chips.map(({id, value}) => (
                <Box m={1} component="span" key={id}>
                    <Chip label={value} onDelete={() => deleteChip(id)}/>
                </Box>
            ))}
        </Grid>
    )

    return (
        <Paper elevation={2} square>
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid item container wrap="nowrap" xs={10} alignItems="center">
                    <Box mx={2}>
                        <Typography>Names:</Typography>
                    </Box>
                    {dataset}
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        label="Enter name"
                        value={filterValue}
                        onChange={onFilterChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
