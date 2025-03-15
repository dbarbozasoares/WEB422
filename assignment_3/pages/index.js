import { useState, useEffect } from "react";
import useSWR from "swr";
import { Accordion, Pagination, Container, Row, Col } from "react-bootstrap";
import ListingDetails from "@/components/ListingDetails";
import PageHeader from "@/components/PageHeader";

const Home = () => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  // Use SWR to fetch listing data from the API
  const { data, error } = useSWR(
    page
      ? `https://webassignments-three.vercel.app/api/listings?page=${page}&perPage=10`
      : null
  );

  // Update data updated if any change on data
  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) => {
        const ratingA = a.review_scores?.review_scores_rating || 0;
        const ratingB = b.review_scores?.review_scores_rating || 0;
        return ratingB - ratingA; // Sort in descending order
      });
      setPageData(sortedData);
    }
  }, [data]);

  // Change pagination
  const previous = () => {
    if (page > 1) setPage(page - 1);
  };

  const next = () => {
    setPage(page + 1);
  };

  // Handle errors or loading states so it displays something
  if (error) {
    return <div>Error loading listings...</div>;
  }

  if (!data) {
    return <div>Loading listings...</div>;
  }

  return (
    <Container>
      <PageHeader text="Sorted by Rating ratio" />

      <Accordion>
        {pageData.map((listing) => (
          <Accordion.Item eventKey={listing._id} key={listing._id}>
            <Accordion.Header>
              <strong>{listing.name}</strong> - {listing.address?.street}
            </Accordion.Header>
            <Accordion.Body>
              <ListingDetails listing={listing} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Row className="mt-3">
        <Col>
          <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
