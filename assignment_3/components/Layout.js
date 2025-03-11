import MainNav from "./MainNav";
import { Container } from "react-bootstrap";
const Layout = () => {
  return (
    <div>
      <MainNav>
        <br />
        <Container>{props.children}</Container>
      </MainNav>
      <br />
    </div>
  );
};

export default Layout;
