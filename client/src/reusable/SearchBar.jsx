import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

const SearchBar = ({ search, searchQuery }) => (
  <FormControl
    style={{ flex: 1, alignItems: "center", minWidth: "300px", height: "100%" }}
  >
    <TextField
      fullWidth
      id="search-bar"
      className="text"
      value={search}
      onInput={(e) => {
        searchQuery(e.target.value);
      }}
      label="Enter a Search Query"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
  </FormControl>
);

export default SearchBar;
