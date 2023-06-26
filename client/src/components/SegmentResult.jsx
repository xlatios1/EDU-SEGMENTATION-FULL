// import "bootswatch/dist/lux/bootstrap.min.css";
import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import styled from "styled-components";

const HighlightedText = styled.span`
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? "rgb(252, 239, 220)" : "inherit"};
`;

const LabelButton = styled(BootstrapButton)`
  padding: 0.5rem 1rem;
`;

const Wrapper = styled.div`
  min-width: 600px;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  border-radius: 0rem;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  min-width: 600px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  background-color: white;
`;

const CardHeader = styled.div`
  background-color: #32383e;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const SegmentResult = ({ result }) => {
  return (
    <Card>
      <CardHeader>Segmentation Result</CardHeader>
      <CardBody>
        <Wrapper>
          <h4>Original Text:</h4>
          <p>{result.text}</p>
          <h4>Segments:</h4>
          <ol>
            {result.segs.map((segments, index) => (
              <li key={index}>{segments}</li>
            ))}
          </ol>
        </Wrapper>
      </CardBody>
    </Card>
  );
};

export default SegmentResult;
