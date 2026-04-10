import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

/** Main navigation bar **/
const NavBar = () => {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setExpanded(false);
    navigate('/');
  };

  return (
    <Navbar 
        bg="dark"
        variant="dark" 
        expand="lg"
        sticky='top'
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className='text-light'>
          Ma Collection
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link className='text-center text-md-start' as={Link} to="/" onClick={() => setExpanded(false)}>
              Accueil
            </Nav.Link>

            {user && (
              <Nav.Link className='text-center text-md-start' as={Link} to="/edit" onClick={() => setExpanded(false)}>
                Edition
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {user ? (
              <Button className='mx-auto mx-md-0 my-2 my-md-0 ms-lg-3 pt-1 px-2 w-11' variant="outline-light" onClick={handleLogout}>
                Déconnecter
              </Button>
            ) : (
              <Nav.Link className='text-center text-md-start' as={Link} to="/login" onClick={() => setExpanded(false)}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;