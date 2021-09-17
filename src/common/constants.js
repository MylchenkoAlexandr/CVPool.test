import {valuesIn} from "lodash";

export const DATASET_FIELDS = {
    NAME: "name",
    EMAIL: "email",
    DATE: "date",
    COMPANY: "company",
    CITY: "city",
}
export const DATASET_ALLOWED_FIELDS = valuesIn(DATASET_FIELDS);
export const KEYBOARD_KEYS = {
    ENTER: "Enter",
    ESCAPE: "Escape"
}
