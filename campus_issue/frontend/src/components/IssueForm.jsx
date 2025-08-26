import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const IssueForm = ({ onIssueSubmit }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');

  const categories = ["Electrical", "Plumbing", "IT Support", "Wi-Fi", "Infrastructure", "Cleaning"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      setError('Please select a category.');
      return;
    }
    onIssueSubmit(formData);
    setFormData({ title: '', description: '', category: '' });
    setError('');
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <h3 className="mb-4 fw-semibold">
          <i className="bi bi-pencil-square me-2"></i>Report a New Issue
        </h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Projector not working in Hall 7" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select a category...</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Provide more details about the issue..." required />
          </Form.Group>
          <Button variant="primary" type="submit" className="px-4">
            <i className="bi bi-send-fill me-2"></i>Submit Issue
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default IssueForm;