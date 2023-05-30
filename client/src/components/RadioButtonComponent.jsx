import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import axios from "axios";

const ApiRadioButton = () => {
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
      <RadioGroup
        aria-label="api-options"
        value={selectedOption}
        onChange={handleChange}
      >
        <FormControlLabel
          value="hard"
          control={<Radio />}
          label="Rest14 - Hard"
        />
        <FormControlLabel
          value="test"
          control={<Radio />}
          label="Rest14 - Test"
        />
      </RadioGroup>
      {data && (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiRadioButton;
