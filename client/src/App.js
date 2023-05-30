import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import SubmitReviewForm from "./components/SubmitReviewForm";
import SubmitSegmentForm from "./components/SubmitSegmentForm";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid">
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
