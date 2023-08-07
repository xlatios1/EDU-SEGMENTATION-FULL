import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const YelpCard = ({ businesses, renderPieCharts }) => {
  return (
    <CardContent sx={{ textAlign: "left", margin: [2, 2, 2, 2] }}>
      {businesses.map((business) => (
        <Card key={business.id} sx={{ margin: [2, 2, 2, 2] }}>
          <div className="container">
            <div className="left-column">
              <h1>{business.name}</h1>
              {business.analyzedReviews &&
                renderPieCharts(business.analyzedReviews)}
            </div>
            <div className="right-column">
              <CardMedia component="img" image={business.image_url} />
              <Typography variant="body2" color="text.secondary">
                <li>
                  <strong>Rating:</strong> {business.rating}
                </li>
                <li>
                  <strong>Price Range:</strong>
                  {business.price}
                </li>
                <li>
                  <strong>Category:</strong> {business.categories[0].title}
                </li>
                <li>
                  <strong>Contact:</strong> {business.display_phone}
                </li>
                <li>
                  <strong>Location:</strong>{" "}
                  <a
                    href={`https://www.google.com/maps?q=${business.coordinates.latitude},${business.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {business.location.display_address}
                  </a>{" "}
                </li>
              </Typography>
            </div>
          </div>
          <div>
            <Typography>
              <h2 style={{ textAlign: "center" }}>Reviews</h2>

              {business.reviews &&
                business.reviews.slice(0, 2).map((review) => (
                  <Card key={review.id} sx={{ margin: 2, padding: 2 }}>
                    <p>
                      <strong>Customer Rating:</strong> {review.rating}
                    </p>
                    <p>
                      <strong>Customer Review:</strong> {review.text}
                    </p>
                    <Typography style={{ textAlign: "center" }}>
                      <em>Written on {review.time_created}</em>
                    </Typography>
                  </Card>
                ))}

              <p style={{ marginLeft: "20px" }}>
                <em>**only 2 reviews/restaurant are displayed</em>
              </p>
            </Typography>
          </div>

          <hr />
        </Card>
      ))}
    </CardContent>
  );
};

export default YelpCard;
