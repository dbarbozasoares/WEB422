import Card from "react-bootstrap/Card";
import about from "@/pages/about";
const PageHeader = ({ text }) => {
  return (
    <>
      <Card className="text-center bg-light">
        <Card.Body>{text}</Card.Body>
      </Card>
      <br />
    </>
  );
};

export default PageHeader;
