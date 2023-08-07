// analyzeBusinesses.js
import { performSentimentAnalysis } from "./PerformSentimentAnalysis";

export const analyzeBusiness = async (business) => {
  const myMap = {};
  
  const analyzedReviews = await performSentimentAnalysis(
    business.name,
    business.reviews,
    myMap
  );
  
  for (const field in analyzedReviews) {
    const { positive, negative, neutral, total } = analyzedReviews[field];
    analyzedReviews[field]["positive"] = (positive / total) * 100;
    analyzedReviews[field]["negative"] = (negative / total) * 100;
    analyzedReviews[field]["neutral"] = (neutral / total) * 100;
  }

  return { ...business, analyzedReviews };
};
