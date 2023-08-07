import React from 'react';
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export const renderPieCharts = (analyzedReviews) => {
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