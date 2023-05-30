import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styled from "styled-components";

const BarChartContainer = styled.div`
  width: 50%;
  margin: 1rem;
`;

const ChartWrapper = styled.div`
  position: relative;
`;

const HighlightBar = styled.div`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const CustomToolTipDiv = styled.div`
  background-color: white;
  padding: 5px 10px 20px 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
`;

const CustomToolTip = ({ active, payload, label }) => {
  if (active) {
    return (
      <CustomToolTipDiv>
        <p>{label}</p>
        {payload[0].dataKey + ": " + payload[0].value}
      </CustomToolTipDiv>
    );
  }
  return null;
};

const convertData = (data) => {
  const keys = Object.keys(data);
  const result = [];
  for (const key of keys) {
    const values = data[key];
    const count = { positive: 0, neutral: 0, negative: 0 };
    for (const value of values) {
      count[value]++;
    }
    result.push({ aspect: key, ...count });
  }
  return result;
};

const BarChartComponent = ({ data }) => {
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  let selectedRow = true;
  const handleClick = (dataPoint) => {
    // Do something when a bar is clicked
    // console.log(dataPoint);
  };

  const chartData = convertData(data);

  return (
    <ResponsiveContainer width="100%" height= "400">
      <ChartWrapper>
        {/* {selectedRow !== null && (
          <HighlightBar
            left={(data.length - selectedRow - 1) * 40 + 35}
            top={0}
            width={40}
            height={200}
          />
        )} */}
        <BarChart
          width={700}
          height={400}
          data={chartData}
          onClick={handleClick}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex);
              setMouseLeave(false);
            } else {
              setFocusBar(null);
              setMouseLeave(true);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="aspect" />
          <YAxis />
          <Tooltip cursor={false} content={<CustomToolTip />} />
          <Legend />
          <Bar dataKey="positive" fill="#82ca9d">
            {chartData.map((entry, index) => (
              <Cell
                fill={
                  focusBar === index || mouseLeave ? "#82ca9d" : "#ffc658)"
                }
              />
            ))}
          </Bar>
          <Bar dataKey="neutral" fill="#ffc658" />
          <Bar dataKey="negative" fill="#8884d8" />
        </BarChart>
      </ChartWrapper>
    </ResponsiveContainer>
  );
};

BarChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOf(["positive", "neutral", "negative"]).isRequired,
    })
  ).isRequired,
  selectedRow: PropTypes.number,
};

BarChartComponent.defaultProps = {
  selectedRow: null,
};

export default BarChartComponent;
