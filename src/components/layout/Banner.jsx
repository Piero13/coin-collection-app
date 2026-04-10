import { Container } from 'react-bootstrap';

/** Top banner **/
const Banner = () => {
  return (
    <header className='bg-gradient-primary p-3'>
      <Container className='d-flex flex-column align-items-center'>
        <h1 className="fw-bold text-light fs-2">Ma collection de pièces</h1>
        <p className="mb-0 text-light fs-7">
          Suivez, organisez et explorez facilement votre collection
        </p>
      </Container>
    </header>
  );
};

export default Banner;