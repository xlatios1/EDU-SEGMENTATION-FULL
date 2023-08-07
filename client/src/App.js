import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import SubmitReviewForm from "./components/SubmitReviewForm";
import SubmitSegmentForm from "./components/SubmitSegmentForm";
import Yelp from "./components/Yelp";
import './App.css'

const App = () => {

  return (
    <Router>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit", margin: "0 16px" }}>
            Home
          </Typography>
          <Typography variant="h6" component={Link} to="/explore" sx={{ textDecoration: "none", color: "inherit", margin: "0 16px" }}>
            Explore
          </Typography>
          <Typography variant="h6" component={Link} to="/analyze" sx={{ textDecoration: "none", color: "inherit", margin: "0 16px" }}>
            Analyze
          </Typography>
          <Typography variant="h6" component={Link} to="/segment" sx={{ textDecoration: "none", color: "inherit", margin: "0 16px" }}>
            Segment
          </Typography>
          <Typography variant="h6" component={Link} to="/yelp" sx={{ textDecoration: "none", color: "inherit", margin: "0 16px" }}>
            Yelp
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="navbar">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/explore"
            element={
              <div>
                <Dashboard />
              </div>
            }
          />
          <Route path="/analyze" element={<SubmitReviewForm />} />
          <Route path="/segment" element={<SubmitSegmentForm />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/yelp" element={<Yelp/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
