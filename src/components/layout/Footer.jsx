import { Container } from 'react-bootstrap';

/** Bottom Footer **/
const Footer = () => {
  return (
    <footer className='bg-dark p-3 fixed-bottom'>
      <Container className='d-flex flex-column align-items-center'>
        <p className="mb-0 text-light fs-6">
          Pierre Fasce @2026
        </p>
      </Container>
    </footer>
  );
};

export default Footer;