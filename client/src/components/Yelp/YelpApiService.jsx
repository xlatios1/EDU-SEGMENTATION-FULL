import React from 'react';
import axios from "axios";

const API_URL = "http://localhost:3002/api"; // Your backend URL

export const getBusinessReviews = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/yelp-reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("ERROR: getBusinessReviews:", error);
    return [];
  }
};

export const getBusinessesWithReviews = async (businesses) => {
  try {
    const businessesWithReviews = await Promise.all(
      businesses.map(async (business) => {
        try {
          const reviews = await getBusinessReviews(business.id);
          return { ...business, reviews };
        } catch (error) {
          console.error("ERROR: businessesWithReviews:", business.name, error);
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

export const searchBusinesses = async (location, businessName) => {
  try {
    const response = await axios.get(
      `${API_URL}/yelp-business/${location}/${businessName}`
    );
    const filteredBusinesses = await response.data.filter(
      (business) => !business.is_closed
    );
    const businessesWithReviews = await getBusinessesWithReviews(
      filteredBusinesses
    );
    const mergedBusinesses = await businessesWithReviews.reduce((acc, curr) => {
      const existingBusiness = acc.find(
        (b) => b.name.toLowerCase() === curr.name.toLowerCase()
      );
      if (existingBusiness) {
        existingBusiness.reviews = (existingBusiness.reviews || []).concat(
          curr.reviews || []
        );
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    return mergedBusinesses;
  } catch (error) {
    console.error("Error searching for businesses:", error);
  }
};
