import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import './App.css';


function Header() {
    const location = useLocation();


  return (
    <Navbar expand="lg" data-bs-theme="dark" style={{backgroundColor: '#14293A', height:100,}}>
      <Container>
        <Navbar.Brand as={Link} to="/Home"><img src={logo} style={{height:100, marginLeft:-80}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <NavDropdown title="Reviews" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/AllGames" id = "navDropLink" active={location.pathname === "/AllGames"}>All Games</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/EditorGames" id = "navDropLink" active={location.pathname === "/EditorGames"}>
                Editor's Choice
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Guides" id = "navLink" active={location.pathname === "/Guides"}>Guides</Nav.Link>
            <Nav.Link as={Link} to="/Speedruns" id = "navLink" active={location.pathname === "/Speedruns"}>Speedruns</Nav.Link>
            <Nav.Link as={Link} to="/Community" id = "navLink" style={{marginRight:-60,}} active={location.pathname === "/Community"}>Community</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;