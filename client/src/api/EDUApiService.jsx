import axios from "axios";

const API_GATEWAY_URL = "http://localhost:5000/api";

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
      console.error("Request failed with error:", error);
      return null;
    }
  },

  postReview: async (
    inputText,
    selectedGranularity,
    selectedModel,
    selectedDevice
  ) => {
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}/analyze-rest-review`,
        JSON.stringify({
          text: inputText,
          granularity: selectedGranularity,
          model: selectedModel,
          device: selectedDevice,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("did it reach here")
      return response.data;
    } catch (error) {
      console.error("Request failed with error:", error);
      return null;
    }
  },

  segmentReview: async (
    inputText,
    selectedGranularity,
    selectedModel,
    selectedDevice
  ) => {
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}/segment-rest-review`,
        JSON.stringify({
          text: inputText,
          granularity: selectedGranularity,
          model: selectedModel,
          device: selectedDevice
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('helloo')
      return response.data;
    } catch (error) {
      console.error("Request failed with error:", error);
      return null;
    }
  },
};
export default apiService;
