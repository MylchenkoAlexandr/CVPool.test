import {filter, isEmpty, keys, map, pick} from "lodash";

export const dataFilter = (dataset = [], values = [], fields = [], index = 0) => {
    if (isEmpty(dataset) || isEmpty(values)) return dataset;
    if (index >= values.length) return dataset;

    const toCompare = values[index].toLowerCase();
    const data = filter(dataset, (row) => {
        if (fields && fields.length) row = pick(row, fields);
        const scope = map(keys(row), (key) => row[key]).join(" ").toLowerCase();
        return Boolean(scope.toLowerCase().indexOf(toCompare) + 1);
    });

    return dataFilter(data, values, fields, ++index)
}
