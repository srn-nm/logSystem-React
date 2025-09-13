import React, { useContext, type ChangeEvent } from "react";
import DataContext from "./dataContext";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius:  alpha(theme.palette.common.white, 0.15),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const SearchBar: React.FC = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("SearchBar must be used within a DataContext.Provider");
  }

  const { searchInput, setSearchInput } = context;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <Search className="rounded-lg">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInput
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchInput}
        onChange={handleChange}
      />
    </Search>
  );
};

export default SearchBar;