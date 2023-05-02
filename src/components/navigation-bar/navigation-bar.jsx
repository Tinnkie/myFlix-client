import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavigationBar = ({ user, onLoggedOut, filteredMovies }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filteredMovies(e.target.value);
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">myFlix Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={`users/${user.Username}`}>Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Movies"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};