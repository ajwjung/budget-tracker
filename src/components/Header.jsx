import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Nav variant="tabs" as="nav" fill>
        <LinkContainer to="/">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/transactions">
          <Nav.Link>Transactions</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/wishlist">
          <Nav.Link>Wishlist Tracker</Nav.Link>
        </LinkContainer>
      </Nav>
    </header>
  );
}

export default Header;
