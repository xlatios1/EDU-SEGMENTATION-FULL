import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SubTableContainer = styled.div`
  width: 50%;
  padding: 0 0.5rem;
`;

const SubTableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const SubTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const SubTableData = styled.td`
  padding: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: 1px solid #ddd;
  &:last-child {
    border-right: none;
  }
`;


const SubTable = ({ rowData }) => {
  return (
    <SubTableContainer>
      <table>
        <thead>
          <tr>
            <SubTableHeader>Labels</SubTableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rowData.labels).map(([key, value]) => (
            <React.Fragment key={key}>
              <SubTableRow>
                <SubTableData>{key}</SubTableData>
                <SubTableData>{value}</SubTableData>
              </SubTableRow>
            </React.Fragment>
          ))}
          {/* {rowData.sem_true.map((score, index) => (
              <SubTableData key={index}>{score}</SubTableData>
            ))} */}
        </tbody>
      </table>
    </SubTableContainer>
  );
};

SubTable.propTypes = {
  rowData: PropTypes.shape({
    word_score: PropTypes.arrayOf(PropTypes.number).isRequired,
    edu_score: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default SubTable;
