import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState("hard");
  const [data, setData] = useState(null);

  const fetchData = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let apiEndpoint;

    switch (selectedOption) {
      case "hard":
        apiEndpoint = "https://api.example.com/data/hard";
        break;
      case "test":
        apiEndpoint = "https://api.example.com/data/test";
        break;
      default:
        apiEndpoint = "https://api.example.com/data/hard";
    }

    fetchData(apiEndpoint);
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Choose Dataset:</InputLabel>
        <Select
          value={selectedOption}
          onChange={handleChange}
          label="Choose Dataset:"
        >
          <MenuItem value="hard">Rest14 - Hard</MenuItem>
          <MenuItem value="test">Rest14 - Test</MenuItem>
        </Select>
      </FormControl>
      {data && (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
