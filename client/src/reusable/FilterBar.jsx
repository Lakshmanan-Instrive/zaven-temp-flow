import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const options = [
  { id: null, value: -1, label: "All" },
  { id: 1, value: 1, label: "Active" },
  { id: 2, value: 2, label: "Inactive" },
  { id: 0, value: 0, label: "Pending" },
];

const FilterBar = ({ filter, changeFilter }) => {
  return (
    <FormControl>
      <Select
        style={{ maxHeight: "40px", minWidth: "200px" }}
        value={filter}
        defaultValue={options[0].value}
        onChange={(e) => changeFilter(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBar;
