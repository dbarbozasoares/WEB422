import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
// fetch(
//   "https://webassignments-three.vercel.app/api/listings?page=1&perPage=10&name=Ribeira%20Charming%20Duplex"
// ).then((res) =>
//   res.json().then((data) => {
//     console.log(data);
//   })
// );
const MainNav = () => {
  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Diego B Soares</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Listings</Nav.Link>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
