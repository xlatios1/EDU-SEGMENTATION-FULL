import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { TextField, Button, Snackbar } from "@mui/material";
import styled from "styled-components";
import apiService from "../api/apiService";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "bootswatch/dist/lux/bootstrap.min.css";
import SegmentResult from "./SegmentResult";

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

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.segmentReview(inputText);
    //   const responseData = JSON.parse(response);
      setResult(response);
    } catch (error) {
      setError("Unable to process the review. Please try again.");
      setOpen(true);
      setInputText("");
    }

    setLoading(false);
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
    <FormContainer>
      <h3>Enter your review for segmentation:</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
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
        <br />
        <br />
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
      </form>

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
  );
};

export default SubmitSegmentForm;
