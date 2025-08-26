import { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = ({ setIsLoggedIn }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('userId', res.data.userId);
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={5} xl={4}>
        <Card className="shadow-lg">
          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center mb-4 fw-bold">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter any email" required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" defaultValue="password" required />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">Login</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;