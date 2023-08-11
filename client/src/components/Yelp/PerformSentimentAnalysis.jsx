import apiService from "../../api/EDUApiService";
import { parseResponseData } from "../../util/DataParsing";
export const analyzeSentiment = async (name, inputText) => {
  try {
    if (inputText) {
      const response = await apiService.postReview(inputText);
      const responseData = JSON.parse(response);
      const parsedData = parseResponseData(responseData);
      return parsedData;
    }
  } catch (error) {
    console.error("ERROR: analyzeSentiment:", name, error);
    return {};
  }
};
export const performSentimentAnalysis = async (name, reviews, myMap) => {
  try {
    await Promise.all(
      reviews.map(async (review) => {
        if (review) {
          const aspectAnalyzedReview = await analyzeSentiment(
            name,
            review.text
          );
          const labels = aspectAnalyzedReview.labels;
          for (const label in labels) {
            const sentiment = labels[label];
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
        }
      })
    );
    return myMap;
  } catch (error) {
    console.error("ERROR: performSentimentAnalysis:", name, error);
  }
};
