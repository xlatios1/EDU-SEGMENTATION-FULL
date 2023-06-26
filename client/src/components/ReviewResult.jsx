import React, { useState } from "react";
import styled from "styled-components";
import { Button as BootstrapButton } from "react-bootstrap";
// import "bootswatch/dist/lux/bootstrap.min.css";

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

const ReviewResult = ({ result }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const processEduScore = (eduScore, aspTrue) => {
    const threshold = 0.5;
    const relevantEduScores = aspTrue
      .map((value, index) => (value === 1 ? eduScore[index] : null))
      .filter((item) => item !== null);

    return relevantEduScores.map((scores) =>
      scores
        .map((score, index) => (score > threshold ? index : null))
        .filter((item) => item !== null)
    );
  };

  const handleClick = (index) => {
    setHighlightedIndex(index);
  };

  const eduScoreIndexes = processEduScore(result.edu_score, result.asp_true);
  const segments = result.raw_text;

  return (
    <Card>
      <CardHeader>Review Result</CardHeader>
      <CardBody>
        <Wrapper>
          <div>
            {Object.entries(result.labels).map(([aspect, sentiment], index) => (
              <LabelButton
                key={index}
                variant={
                  sentiment === "positive"
                    ? "success"
                    : sentiment === "negative"
                    ? "danger"
                    : "info"
                }
                onClick={() => handleClick(eduScoreIndexes[index][0])}
                className="mx-1"
              >
                {`${aspect}: ${sentiment}`}
              </LabelButton>
            ))}
          </div>
          <br />
          <p>
            {segments.map((segment, index) => (
              <React.Fragment key={index}>
                <HighlightedText isHighlighted={highlightedIndex === index}>
                  {segment}
                </HighlightedText>
                {index < segments.length - 1 && " "}
              </React.Fragment>
            ))}
          </p>
        </Wrapper>
      </CardBody>
    </Card>
  );
};

export default ReviewResult;
