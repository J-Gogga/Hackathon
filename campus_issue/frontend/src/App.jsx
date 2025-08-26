import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Container as="main" className="my-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/" 
              element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Container>
        <footer className="text-center py-3 bg-light">
            <p className="mb-0 text-muted">&copy; 2025 Campus Issue Tracker</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;