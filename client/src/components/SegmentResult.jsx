// import "bootswatch/dist/lux/bootstrap.min.css";
import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import styled from "styled-components";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CardHeader = styled.div`
  background-color: #32383e;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const SegmentResult = ({ result }) => {
  return (
    <div className="card-container">
      <Card className="card">
        <CardHeader>EDU-segmented results</CardHeader>
        <CardContent>
          <p>
            <strong>Original Text:</strong> <br />
            {result.text}
          </p>
          <p>
            <strong>Granularity:</strong> {result.granularity}{" "} <br/>
            <strong>Model:</strong> {result.model}{" "} <br/>
            <strong>Device:</strong> {result.device}{" "}<br/>
            <strong>Conjunction Words:</strong> {result.conjunctions}{" "}
          </p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Index</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Words</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.segs.map((words, index) => (
                  <TableRow key={`${words}-${index}`}>
                    <TableCell>{words[0]}</TableCell>
                    <TableCell>{words[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SegmentResult;
