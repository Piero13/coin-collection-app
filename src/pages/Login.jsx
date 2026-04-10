import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

/** Login page for admin **/
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await login(email, password);

    if (error) {
      alert(error.message);
    } else {
      navigate('/edit');
    }
  };

  return (
    <Container className="pt-5">
      <h2 className='text-center mb-4'>Admin Login</h2>

      <Form onSubmit={handleSubmit} className='w-80 w-md-16 w-lg-18 mx-auto border border-primaryDark p-3 rounded d-flex flex-column'>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border-primary'
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border-primary'
          />
        </Form.Group>

        <Button className='mx-auto w-auto px-3 border-primaryDark bs-dark' type="submit">Se connecter</Button>
      </Form>
    </Container>
  );
};

export default Login;