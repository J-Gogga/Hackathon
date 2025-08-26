import { Card, Badge } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { enIN } from 'date-fns/locale'; // For Indian English locale (Bengaluru)

const IssueCard = ({ issue }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'In-Progress': return 'info';
      case 'Resolved': return 'success';
      default: return 'secondary';
    }
  };

  // Calculate the "time ago" string
  const timeAgo = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
    locale: enIN,
  });

  return (
    <Card className="h-100">
      <Card.Header>
        <Badge pill bg={getStatusVariant(issue.status)} className="text-dark">
          {issue.status}
        </Badge>
        <span className="text-muted small ms-2">{issue.category}</span>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6" className="fw-bold">{issue.title}</Card.Title>
        <Card.Text className="text-secondary small flex-grow-1">
          {issue.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>
          <i className="bi bi-person-fill me-1"></i>{issue.createdBy?.name || 'Unknown'}
          <span className="mx-2">•</span>
          <i className="bi bi-clock-history me-1"></i>{timeAgo}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default IssueCard;