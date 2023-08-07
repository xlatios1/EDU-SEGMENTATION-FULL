import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import apiService from "../api/apiService";
import { parseResponseData } from "../util/DataParsing";
import Loading from "./Loading";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const Yelp = () => {
  const [businesses, setBusinesses] = useState([]);
  const [load, setIsload] = useState(false);
  const [search, setIsSearch] = useState(false);
  const API_URL = "http://localhost:3002/api"; // Your backend URL
  const location = "Singapore"; // TO DO: customize on FE
  // const businessName = "Pastamania"; // TO DO: customize on FE, available for all businesses, only tuned for restaurants
  const [chartComponents, setChartComponents] = useState([]);
  const [businessName, setBusinessName] = useState("");

  let alertText;

  useEffect(() => {
    console.log("businesseseses", businesses);
    chartComponents.forEach((chart) => chart.destroy());
    setChartComponents([]);
  }, [businesses]);

  const getBusinessReviews = async (id) => {
    // console.log("getBusinessReviews: business id", id);
    try {
      const response = await axios.get(`${API_URL}/yelp-reviews/${id}`);
      // console.log(
      //   "getBusinessReviews: axios getting response from api",
      //   `${API_URL}/yelp-reviews/${id}`
      // );
      return response.data;
    } catch (error) {
      console.error("ERROR: getBusinessReviews:", error);
      return [];
    }
  };

  const getBusinessesWithReviews = async (businesses) => {
    try {
      // console.log("getBusinessesWithReviews: businesses:", businesses);
      const businessesWithReviews = await Promise.all(
        businesses.map(async (business) => {
          try {
            const reviews = await getBusinessReviews(business.id);
            // console.log("business:", business.name, "with reviews:", reviews);
            return { ...business, reviews };
          } catch (error) {
            console.error(
              "ERROR: businessesWithReviews:",
              business.name,
              error
            );
          }
        })
      );
      console.log("getBusinessesWithReviews:", businessesWithReviews);
      return businessesWithReviews;
    } catch (error) {
      console.error("ERROR: businessesWithReviews:", error);
      return [];
    }
  };

  const analyzeSentiment = async (name, inputText) => {
    try {
      if (inputText) {
        console.log("analyzeSentiment: inputText", name, inputText);
        const response = await apiService.postReview(inputText);
        console.log("inputText:", inputText, name, "response:", response);
        const responseData = JSON.parse(response);
        console.log(
          "inputText:",
          inputText,
          name,
          "responseData",
          responseData
        );
        const parsedData = parseResponseData(responseData);
        console.log("inputText:", inputText, name, "parsedData", parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error("ERROR: analyzeSentiment:", name, error);
      return {};
    }
  };
  const performSentimentAnalysis = async (name, reviews, myMap) => {
    try {
      // Perform sentiment analysis on each review's text
      console.log(
        "business:",
        name,
        "performSentimentAnalysis with reviews",
        reviews,
        "with myMap:",
        myMap
      );
      await Promise.all(
        reviews.map(async (review) => {
          if (review) {
            console.log(
              "performSentimentAnalysis for",
              name,
              "review:",
              review
            );
            const aspectAnalyzedReview = await analyzeSentiment(
              name,
              review.text
            );
            console.log(
              "performSentimentAnalysis for",
              name,
              "analyzed review",
              aspectAnalyzedReview
            );
            const labels = aspectAnalyzedReview.labels;
            console.log("performSentimentAnalysis for", name, "labels", labels);
            for (const label in labels) {
              console.log("performSentimentAnalysis for", name, "label", label);
              const sentiment = labels[label];
              console.log(
                "performSentimentAnalysis for",
                name,
                "sentiment",
                sentiment
              );
              if (!myMap[label]) {
                myMap[label] = {
                  positive: 0,
                  negative: 0,
                  neutral: 0,
                  total: 0,
                };
              }
              myMap[label][sentiment]++;
              myMap[label]["total"]++;
            }
            console.log("performSentimentAnalysis for", name, "myMap", myMap);
          }
        })
      );
      console.log("full map obtained for one business", name, myMap);
      return myMap;
    } catch (error) {
      console.error("ERROR: performSentimentAnalysis:", name, error);
    }
  };

  const searchBusiness = async () => {
    setIsload(true);
    setIsSearch(true);
    try {
      const response = await axios.get(
        `${API_URL}/yelp-business/${location}/${businessName}`
      );
      console.log(
        "searchBusiness: response",
        response,
        "for",
        `${API_URL}/yelp-business/${location}/${businessName}`
      );

      const filteredBusinesses = await response.data.filter(
        (business) => !business.is_closed
      );
      console.log(
        "searchBusiness:filteredBusinesses is obtained:",
        filteredBusinesses
      );

      const businessesWithReviews = await getBusinessesWithReviews(
        filteredBusinesses
      );
      console.log(
        "searchBusiness:businessesWithReviews is obtained:",
        businessesWithReviews
      );

      const mergedBusinesses = await businessesWithReviews.reduce(
        (acc, curr) => {
          const existingBusiness = acc.find(
            (b) => b.name.toLowerCase() === curr.name.toLowerCase()
          );
          if (existingBusiness) {
            existingBusiness.reviews = (existingBusiness.reviews || []).concat(
              curr.reviews || []
            );
            console.log(
              "searchBusiness:existingBusinessreviews is obtained:",
              existingBusiness.reviews
            );
          } else {
            acc.push(curr);
          }
          return acc;
        },
        []
      );
      console.log(
        "searchBusiness:mergedBusinesses is obtained",
        mergedBusinesses
      );

      const analyzedBusinessesPromises = mergedBusinesses.map(
        async (business) => {
          console.log("searchBusiness:business in question:", business.name);
          const myMap = {};
          //return Map {"food":40, "ambience":80, "miscellaneous":90} (planning phase)
          const analyzedReviews = await performSentimentAnalysis(
            business.name,
            business.reviews,
            myMap
          );
          console.log(
            "searchBusiness: analyzedReviews for:",
            business.name,
            analyzedReviews
          );
          for (const field in analyzedReviews) {
            console.log(
              "searchBusiness:which field are we focussing on",
              business.name,
              field
            );
            const { positive, negative, neutral, total } =
              analyzedReviews[field];
            analyzedReviews[field]["positive"] = (positive / total) * 100;
            analyzedReviews[field]["negative"] = (negative / total) * 100;
            analyzedReviews[field]["neutral"] = (neutral / total) * 100;
          }
          console.log(
            "searchBusiness: updated analyzedReviews for",
            business.name,
            analyzedReviews
          );
          return { ...business, analyzedReviews };
        }
      );
      const analyzedBiz = await Promise.all(analyzedBusinessesPromises);
      setBusinesses(analyzedBiz);
      setIsload(false);
      console.log("final final businesses", businesses);
      setBusinessName("");
    } catch (error) {
      console.error("Error searching for business:", error);
      setIsload(false);
      // return null
    }
  };

  const renderPieCharts = (analyzedReviews) => {
    const validAspects = Object.keys(analyzedReviews).filter(
      (aspect) => typeof aspect === "string"
    );
    return (
      <div style={{ display: "flex" }}>
        {validAspects.map((aspect) => {
          const data = {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [
              {
                data: [
                  analyzedReviews[aspect].positive,
                  analyzedReviews[aspect].negative,
                  analyzedReviews[aspect].neutral,
                ],
                backgroundColor: ["#2E7D32", "#C62828", "#FFC107"],
              },
            ],
          };

          const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            width: 100,
            height: 100,
          };

          return (
            <div key={aspect} style={{ margin: "2px", width: "150px" }}>
              <h3>{aspect.substring(0, 9)}</h3>
              <Doughnut data={data} options={chartOptions} />
            </div>
          );
        })}
      </div>
    );
  };

  const card = (
    <React.Fragment>
      <CardContent sx={{ textAlign: "left", margin: [2, 2, 2, 2] }}>
        {businesses.map((business) => (
          <Card key={business.id} sx={{ margin: [2, 2, 2, 2] }}>
            <div className="container">
              <div className="left-column">
                <h1>{business.name}</h1>
                {business.analyzedReviews &&
                  renderPieCharts(business.analyzedReviews)}
              </div>
              <div className="right-column">
                <CardMedia component="img" image={business.image_url} />
                <Typography variant="body2" color="text.secondary">
                  <li>
                    <strong>Rating:</strong> {business.rating}
                  </li>
                  <li>
                    <strong>Price Range:</strong>
                    {business.price}
                  </li>
                  <li>
                    <strong>Category:</strong> {business.categories[0].title}
                  </li>
                  <li>
                    <strong>Contact:</strong> {business.display_phone}
                  </li>
                  <li>
                    <strong>Location:</strong>{" "}
                    <a
                      href={`https://www.google.com/maps?q=${business.coordinates.latitude},${business.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {business.location.display_address}
                    </a>{" "}
                  </li>
                </Typography>
              </div>
            </div>
            <div>
              <Typography>
                <h2 style={{ textAlign: "center" }}>Reviews</h2>

                {business.reviews &&
                  business.reviews.slice(0, 2).map((review) => (
                    <Card key={review.id} sx={{ margin: 2, padding: 2 }}>
                      <p>
                        <strong>Customer Rating:</strong> {review.rating}
                      </p>
                      <p>
                        <strong>Customer Review:</strong> {review.text}
                      </p>
                      <Typography style={{ textAlign: "center" }}>
                        <em>Written on {review.time_created}</em>
                      </Typography>
                    </Card>
                  ))}

                <p style={{ marginLeft: "20px" }}>
                  <em>**only 2 reviews/restaurant are displayed</em>
                </p>
              </Typography>
            </div>

            <hr />
          </Card>
        ))}
      </CardContent>
    </React.Fragment>
  );

  if (search == true && load == false && businesses.length <= 0) {
    const copyBizName = businessName;
    if (copyBizName == businessName) {
      alertText = (
        <p style={{ textAlign: "center" }}>
          No search results for "{businessName}" found.
        </p>
      );
    } else {
      setIsSearch(false);
    }
  }

  return (
    <div className="App">
      <div>
        <div>
          <h1 style={{ textAlign: "center" }}>Yelp Restaurant Search</h1>
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
          {load ? <Loading /> : null}
          <Box sx={{ margin: [2, 2, 2, 2] }}>
            <div sx={{ margin: [2, 2, 2, 2] }}>{card}</div>
          </Box>
        </div>
      </div>
      {alertText}
    </div>
  );
};

export default Yelp;
