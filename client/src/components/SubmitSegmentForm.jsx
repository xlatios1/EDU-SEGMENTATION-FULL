import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { TextField, Button, Snackbar } from "@mui/material";
import styled from "styled-components";
import apiService from "../api/EDUApiService";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import "bootswatch/dist/lux/bootstrap.min.css";
import SegmentResult from "./SegmentResult";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FormContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitSegmentForm = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedGranularity, setSelectedGranularity] = useState("default");
  const [selectedModel, setSelectedModel] = useState("bart");
  const [selectedDevice, setSelectedDevice] = useState("cpu");
  const [elapsedTime, setElapsedTime] = useState("");
  const [selectedConjunction, setSelectedConjunction] = useState("default");
  const [selectedCustom, setSelectedCustom] = useState("and, however, but");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGranularityChange = (e) => {
    setSelectedGranularity(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  const handleConjunctionChange = (e) => {
    setSelectedConjunction(e.target.value);
  };

  const handleCustomChange = (e) => {
    setSelectedCustom(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const startTime = performance.now();
    setLoading(true);

    try {
      const response = await apiService.segmentReview(
        inputText,
        selectedGranularity,
        selectedModel,
        selectedDevice,
        selectedCustom
      );
      //   const responseData = JSON.parse(response);
      setResult(response);
    } catch (error) {
      setError("Unable to process the review. Please try again.");
      setOpen(true);
      setInputText("");
    } finally {
      setLoading(false);
    }
    const endTime = performance.now();
    setElapsedTime(endTime - startTime);
  };

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

  return (
    <div className="Segment">
      <FormContainer>
        <div sx={{ color: "white" }}>
          <h3 className="text">
            Enter your review for <u>segmentation:</u>
          </h3>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            className="textboxInput"
            label="Review"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={handleChange}
            sx={{
              minWidth: "600px", // Set the minimum width for the TextField
              marginBottom: "1rem", // Add some margin to separate the TextField from the Button
            }}
          />
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <FormControl
              sx={{
                backgroundColor: "#fff",
                minWidth: "200px",
                marginRight: "1rem",
              }}
            >
              <InputLabel id="granularity-label">Granularity</InputLabel>
              <Select
                value={selectedGranularity}
                onChange={handleGranularityChange}
                sx={{ backgroundColor: "#fff", minWidth: "150px" }}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="conjunction_words">
                  Split by Conjunction Words
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className="model-select"
              sx={{
                backgroundColor: "#fff",
                minWidth: "200px",
                marginRight: "1rem",
              }}
            >
              <InputLabel id="model-label">Model</InputLabel>
              <Select
                value={selectedModel}
                onChange={handleModelChange}
                sx={{ backgroundColor: "#fff", minWidth: "150px" }}
              >
                <MenuItem value="bart">BART model</MenuItem>
                <MenuItem value="bert_uncased">BERT-uncased model</MenuItem>
                <MenuItem value="bert_cased">BERT-cased model</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                backgroundColor: "#fff",
                minWidth: "200px",
                marginRight: "1rem",
              }}
            >
              <InputLabel id="device-label">Device</InputLabel>
              <Select
                value={selectedDevice}
                onChange={handleDeviceChange}
                sx={{ backgroundColor: "#fff", minWidth: "150px" }}
              >
                <MenuItem value="cpu">CPU</MenuItem>
                <MenuItem value="cuda">GPU</MenuItem>
              </Select>
            </FormControl>
            {selectedGranularity === "conjunction_words" && (
              <FormControl
                sx={{
                  backgroundColor: "#fff",
                  minWidth: "200px",
                  marginRight: "1rem",
                }}
              >
                <InputLabel id="conjunction-label">
                  Conjunction Words
                </InputLabel>
                <Select
                  value={selectedConjunction}
                  onChange={handleConjunctionChange}
                  sx={{ backgroundColor: "#fff", minWidth: "150px" }}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            )}
            {selectedGranularity === "conjunction_words" &&
              selectedConjunction === "custom" && (
                <TextField
                  label="Custom Option"
                  onChange={handleCustomChange}
                  sx={{
                    backgroundColor: "#fff",
                    minWidth: "200px",
                  }}
                />
              )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!inputText || loading}
              size="large"
              sx={{ marginTop: 1 }}
            >
              Segment
            </Button>
          </div>
        </form>
        <p className="text">
          Default Conjunction Words Option segments conjunction words "and, but,
          however" at the start or end of each EDU segment. <br />
          Custom Option Example: (insert conjunction word separated by a comma)
        </p>
        <p className="text">
          <em>Elapsed Time: {(elapsedTime / 1000).toFixed(2)}s</em>
        </p>

        {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
        {result && <SegmentResult result={result} />}
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
      </FormContainer>
    </div>
  );
};

export default SubmitSegmentForm;
