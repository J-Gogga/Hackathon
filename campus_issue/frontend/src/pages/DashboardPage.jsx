import { useState, useEffect } from 'react';
import IssueForm from '../components/IssueForm';
import IssueCard from '../components/IssueCard';
import { Row, Col } from 'react-bootstrap';
import api from '../api';

const DashboardPage = () => {
  const [issues, setIssues] = useState([]);
  const userId = localStorage.getItem('userId'); // Or get from context

  useEffect(() => {
    if (userId) {
      api.get(`/issues/${userId}`)
        .then(res => setIssues(res.data))
        .catch(err => {/* handle error */ });
    }
  }, [userId]);

  const handleIssueSubmit = async (newIssueData) => {
    try {
      const res = await api.post('/issues', { userId, ...newIssueData });
      if (res.data.success) {
        setIssues([res.data.issue, ...issues]);
      }
    } catch (err) {
      // handle error
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-0">Issue Dashboard</h1>
          <p className="text-muted">Report and track campus issues efficiently.</p>
        </div>
      </div>
      <IssueForm onIssueSubmit={handleIssueSubmit} />
      <hr className="my-5" />
      <h2 className="mb-4 fw-semibold">
        <i className="bi bi-list-task me-2"></i>Current Issues
      </h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {issues.map(issue => (
          <Col key={issue._id}>
            <IssueCard issue={issue} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DashboardPage;