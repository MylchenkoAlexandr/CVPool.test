import React, {useState} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Filters from "./filters";
import {isEmpty, isNil, reject, sortBy} from "lodash";
import {DATASET_ALLOWED_FIELDS, DATASET_FIELDS} from "../../common/constants";
import {dataFilter} from "../../common/utils";

const FIELDS_FOR_SEARCH = [
    DATASET_FIELDS.NAME,

    /** @description You can add additional fields for search */
    // DATASET_FIELDS.EMAIL

    /** @description You can add all available fields for search */
    // ... DATASET_ALLOWED_FIELDS
]

export default function Staff({data}) {
    const [staff, setStuff] = useState(data);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState([]);

    const onSortHandler = ({target: {textContent}}) => setStuff(sortBy(staff, textContent));
    const onFilterHandler = (data) => {
        setFilter(data);
    }
    const onFilterSearch = (values) => {
        if (isNil(values)) return;
        setSearch(values);
    }

    const prepare = (data, filter, search, fields) => {
        let preparedDataset = data;

        if (!isEmpty(filter)) {
            const _filter = reject(filter.map(({value}) => (value)), isEmpty);
            preparedDataset = dataFilter(data, _filter, fields);
        }
        if (!isEmpty(search)) {
            preparedDataset = dataFilter(preparedDataset, [search], fields);
        }

        return preparedDataset;
    }
    const headers = DATASET_ALLOWED_FIELDS.map((column) => {
        return (
            <TableCell key={column}>
                <TableSortLabel onClick={onSortHandler} component={Typography} IconComponent={ArrowDropDownIcon}>
                    {column}
                </TableSortLabel>
            </TableCell>
        )
    })
    const dataset = prepare(staff, filter, search, FIELDS_FOR_SEARCH).map((row, index) => {
        const child = DATASET_ALLOWED_FIELDS.map((fieldName, key) => {
            const value = row[fieldName];
            return (
                <TableCell key={key}>
                    {value}
                </TableCell>
            )
        })
        return (
            <TableRow hover key={index}>
                {child}
            </TableRow>
        )
    });

    return (
        <>
            <Filters
                onFilter={onFilterHandler}
                onSearch={onFilterSearch}
            />
            <Box my={6}/>
            <Paper elevation={2} square>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headers}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataset}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}
