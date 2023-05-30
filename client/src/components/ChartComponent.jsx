import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import React, { useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import DataTable from "react-data-table-component";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// define a styled component
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const TableWrapper = styled.div`
  margin: 20px 0 auto;
  border: 1px solid #c9c9c9;
  padding: 0 0.5rem;
`;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Sentiment Analysis",
    },
  },
};

const obtainEduByAspSentiment = (rawData, aspIndex) => {
  const filteredIndices = [];
  rawData.forEach((obj, outerIndex) => {
    const scores = obj.edu_score[aspIndex];
    const scoreIndices = [];
    scores.forEach((score, scoreIndex) => {
      if (score >= 0.5) {
        scoreIndices.push(scoreIndex);
      }
    });
    if (scoreIndices.length !== 0) {
      filteredIndices.push({ outerIndex, scoreIndices });
    }
  });
  return filteredIndices;
};

const highlightRawText = (
  rawData,
  indexOfHighlightedText,
  currAsp,
  currLabel
) => {
  const highlightedData = [];
  const colTitle = `Sentiment Analysis - ${currAsp}: ${currLabel}`;

  indexOfHighlightedText.forEach(({ outerIndex, scoreIndices }) => {
    const currRawText = rawData[outerIndex].raw_text;

    const highlightedTextArray = currRawText
      .filter((_, index) => scoreIndices.includes(index))
      .map((text) => `${text}`);

    highlightedData.push({
      text: rawData[outerIndex].text,
      textToHighlight: highlightedTextArray,
    });
  });

  return { colTitle, highlightedData };
};

const CustomCell = ({ row }) => (
  <div>
    <Highlighter
      highlightClassName="SentimentHighlighter"
      searchWords={row.textToHighlight}
      textToHighlight={row.text}
      autoEscape={true}
    />
  </div>
);

const ChartComponent = ({ rawData, chartData, selectedOption }) => {
  const chartRef = useRef();
  const [tableData, setTableData] = useState(null);
  const [colTitle, setColTitle] = useState("");

  const onClick = (event) => {
    const elem = getElementAtEvent(chartRef.current, event);
    var aspIndex = elem[0].index;
    var sentimentIndex = elem[0].datasetIndex;

    var currAsp = chartData.labels[aspIndex];
    var currLabel = chartData.datasets[sentimentIndex].label;

    var filteredData = rawData.filter(
      (data) => data.labels[currAsp] === currLabel
    );

    let indexOfHighlightedText = obtainEduByAspSentiment(
      filteredData,
      aspIndex
    );

    let dataToHighlight = highlightRawText(
      filteredData,
      indexOfHighlightedText,
      currAsp,
      currLabel
    );

    setTableData(dataToHighlight.highlightedData);
    setColTitle(dataToHighlight.colTitle);
  };

  const columns = [
    {
      name: "Sentiment analysis",
      selector: (row) => row.text,
      wrap: true,
      center: false,
      cell: (row) => <CustomCell row={row} />,
    },
  ];

  if (colTitle.length !== 0) {
    columns[0].name = colTitle;
  }

  return (
    <SubWrapper>
      <div>
        {chartData ? (
          <Bar
            key={selectedOption}
            data={chartData}
            onClick={onClick}
            ref={chartRef}
            options={{ maintainAspectRatio: true }}
          ></Bar>
        ) : (
          "Loading..."
        )}
      </div>
      <div>
        {tableData ? (
          <TableWrapper>
            <DataTable
              columns={columns}
              data={tableData}
              pagination
              highlightOnHover
            />
          </TableWrapper>
        ) : (
          ""
        )}
      </div>
    </SubWrapper>
  );
};

export default ChartComponent;
