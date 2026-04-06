import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TouristAuth from './pages/auth/TouristAuth';
import GuideAuth from './pages/auth/GuideAuth';
import LandingPage from './pages/LandingPage';
import Portfolio from './pages/Portfolio';
import TouristDashboard from './pages/tourist/Dashboard';
import GuideDashboard from './pages/guide/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/auth/tourist" element={<TouristAuth />} />
        <Route path="/auth/guide" element={<GuideAuth />} />
        <Route path="/tourist/dashboard" element={<TouristDashboard />} />
        <Route path="/guide/dashboard" element={<GuideDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
