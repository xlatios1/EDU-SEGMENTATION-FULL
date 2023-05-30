import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import styled from "styled-components";
import RowReviewCard from "./RowReviewCard";

const TableContainer = styled.div`
  // width: 50%;
  // display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  border: 1px solid #c9c9c9;
`;

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const conditionalRowStyles = [
  {
    when: (row) => row.toggleSelected === true,
    style: {
      backgroundColor: "rgb(236, 236, 236)",
      userSelect: "none",
    },
  },
];

const Table = ({ headers, data }) => {
  const [tableData, setTableData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const parseRowData = data.map((row) => {
    return {
      ...row,
      toggleSelected: false,
    };
  });

  useEffect(() => {
    setTableData(parseRowData);
  }, []);

  const handleRowClick = (row) => {
    const updatedData = tableData.map((item) => {
      if (row.text === item.text) {
        // Clicked row
        return {
          ...item,
          toggleSelected: !item.toggleSelected,
        };
      } else if (item.toggleSelected) {
        // Previously selected row
        return {
          ...item,
          toggleSelected: false,
        };
      }
      return item;
    });
  
    // Set the selectedRow state to the clicked row if it is not already selected, otherwise set it to null
    setSelectedRow((prevState) => (prevState && prevState.text === row.text ? null : row));
    setTableData(updatedData);
  };

  return (
    <div>
      {selectedRow && <RowReviewCard result={selectedRow} />}
      <TableContainer>
        {tableData && (
          <DataTable
            columns={headers}
            data={tableData}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            onRowClicked={handleRowClick}
            highlightOnHover
            pointerOnHover
            pagination
          />
        )}
      </TableContainer>
    </div>
  );
};

export default Table;
