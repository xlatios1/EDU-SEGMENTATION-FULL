import CloseIcon from "@mui/icons-material/Close";
import { FormControl, MenuItem, Select, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../api/apiService";
import ChartComponent from "./ChartComponent";
import Table from "./Table";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 3rem;

  > div:first-child {
    width: 40%;
  }

  > div:last-child {
    width: 60%;
  }
`;

const DropdownGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  padding-left: 10px;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .MuiFormHelperText-root {
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }

  .MuiSelect-root {
    font-size: 1rem;
    font-weight: 400;
    color: #333;
  }

  .MuiSelect-selectMenu {
    padding: 10px 24px 10px 16px;
  }

  .MuiMenuItem-root {
    font-size: 1rem;
    font-weight: 400;
    color: #333;
  }
`;

const sentimentColors = {
  positive: "rgba(151, 227, 194, 0.7)", // Green
  negative: "rgba(246, 156, 158, 0.7)", // Red
  neutral: "rgba(170, 210, 236, 0.7)", // Blue
};

const transformToChartData = (data) => {
  const uniqueValues = new Set();
  for (const key in data) {
    data[key].forEach((value) => uniqueValues.add(value));
  }

  const datasets = [];
  uniqueValues.forEach((value) => {
    const dataCounts = [];
    for (const key in data) {
      const count = data[key].filter((val) => val === value).length;
      dataCounts.push(count);
    }
    datasets.push({
      label: value,
      data: dataCounts,
      backgroundColor: sentimentColors[value],
    });
  });

  // Create the final object with the keys and datasets
  const labels = Object.keys(data);
  return { labels, datasets };
};

const Dashboard = ({}) => {
  const [data, setData] = useState(null);
  const [dataLabels, setDataLabels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("hard");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await apiService.getResData(selectedOption);
        const { data, dataLabels } = processRawData(resData);
        setData(data);
        setDataLabels(dataLabels);
        setIsLoading(false);

        const newChartData = transformToChartData(dataLabels);
        setChartData(newChartData);
      } catch (err) {
        setError("Unable to load the dataset. Please try again.");
        setOpen(true);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const headers = [
    {
      name: "Reviews",
      selector: (row) => row.text,
      wrap: true,
      center: false,
    },
  ];

  const processRawData = (rawData) => {
    const dataLabels = {};

    const data = rawData.map((obj) => ({
      raw_text: obj.text,
      text: obj.text.join(" "),
      word_score: obj.word_score,
      edu_score: obj.edu_score,
      labels: obj.labels.reduce((asp, label) => {
        const [key, value] = label.split(":");
        asp[key] = value;
        dataLabels[key] = dataLabels[key] || [];
        dataLabels[key].push(value);
        return asp;
      }, {}),
      sem_true: obj.sem_true,
      asp_true: obj.asp_true,
    }));

    return { data, dataLabels };
  };

  return (
    <div>
      <DropdownGroupWrapper>
        <StyledFormControl>
          <h4 id="choose-dataset-label">Choose Dataset:</h4>
          <Select
            labelId="choose-dataset-label"
            id="choose-dataset"
            value={selectedOption}
            onChange={handleChange}
          >
            <MenuItem value="hard">Rest14 - Hard</MenuItem>
            <MenuItem value="test">Rest14 - Test</MenuItem>
          </Select>
        </StyledFormControl>
      </DropdownGroupWrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Wrapper>
          <Table headers={headers} data={data} labels={dataLabels} />
          <ChartComponent
            key={selectedOption}
            rawData={data}
            chartData={chartData}
            selectedOption={selectedOption}
          />
        </Wrapper>
      )}
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      )}
    </div>
  );
};

export default Dashboard;
