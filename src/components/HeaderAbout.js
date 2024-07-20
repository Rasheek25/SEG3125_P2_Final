import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import { useTranslation } from 'react-i18next';


function HeaderAbout() {
    const location = useLocation();

    const{ t, i18n } = useTranslation();


  return (
    <Navbar role="navigation" expand="lg" data-bs-theme="dark" style={{backgroundColor: '#14293A', height:100,}}>
      <Container>
        <Navbar.Brand as={Link} to="/Home"><img src={logo} style={{height:100, marginLeft:-80}} alt='Site Logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <NavDropdown title={t('navbar.link1')} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/AllGames" id = "navDropLink" active={location.pathname === "/AllGames"}>{t('navbar.linkdrop1')}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/EditorGames" id = "navDropLink" active={location.pathname === "/EditorGames"}>
              {t('navbar.linkdrop2')}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Guides" id = "navLink" active={location.pathname === "/Guides"}>{t('navbar.link2')}</Nav.Link>
            <Nav.Link as={Link} to="/Speedruns" id = "navLink" active={location.pathname === "/Speedruns"}>{t('navbar.link3')}</Nav.Link>
            <Nav.Link as={Link} to="/Community" id = "navLink" style={{marginRight:-60,}} active={location.pathname === "/Community"}>{t('navbar.link4')}</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderAbout;