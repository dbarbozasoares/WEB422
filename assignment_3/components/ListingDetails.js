import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ListingDetails = ({ listing }) => {
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/600x400?text=Photo+Not+Available";
            }}
            className="img-fluid w-100"
            src={listing.images.picture_url}
            alt="Listing Image"
          />
          <br />
          <br />
        </Col>
        <Col lg={6}>
          <p>
            {listing.neighborhood_overview
              ? listing.neighborhood_overview
              : "No neighborhood overview available"}
          </p>
          <br />
          <strong>Price:</strong> ${listing.price?.$numberDecimal}
          <br />
          <strong>Room:</strong> {listing.room_type}
          <br />
          <strong>Bed:</strong> {listing.bed_type} ({listing.beds} Bed
          {listing.beds > 1 ? "s" : ""} - {listing.bedrooms} Bedroom
          {listing.bedrooms > 1 ? "s" : ""})
          <br />
          <br />
          <strong>Rating:</strong>{" "}
          {listing.review_scores.review_scores_rating
            ? listing.review_scores.review_scores_rating
            : 0}
          /100 ({listing.number_of_reviews} Reviews)
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetails;
