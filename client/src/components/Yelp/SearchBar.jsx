// SearchBar.js
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SearchBar = ({ businessName, setBusinessName, searchBusiness }) => {
  return (
    <Box className="searchinit">
      <TextField
        id="standard-basic"
        variant="filled"
        className="textfield"
        value={businessName}
        onChange={(event) => setBusinessName(event.target.value)}
        InputProps={{
          inputProps: {
            style: { textAlign: "center", fontSize: "25px" },
          },
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        className="search-container"
        onClick={searchBusiness}
      >
        Search🔎
      </Button>
    </Box>
  );
};

export default SearchBar;
