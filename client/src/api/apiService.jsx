
import axios from "axios";

const API_GATEWAY_URL = "http://127.0.0.1:8080/api";

const apiService = {
  getResData: async (selectedOption) => {
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/rest-raw-data/1`);
      const jsonResponse = JSON.parse(response.data);

      switch (selectedOption) {
        case "hard":
          return jsonResponse.hard;

        case "test":
          return jsonResponse.test;
        default:
          return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  postReview: async (inputText) => {
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}/analyze-rest-review`,
        JSON.stringify({ text: inputText }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  segmentReview: async (inputText) => {
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}/segment-rest-review`,
        JSON.stringify({ text: inputText }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export default apiService;



