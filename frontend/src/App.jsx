import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Participation from './pages/Participation';
import RegisterTeam from './pages/RegisterTeam';
import RegisterFaculty from './pages/RegisterFaculty';
import LoginSelection from './pages/LoginSelection';
import TeamLogin from './pages/TeamLogin';
import FacultyLogin from './pages/FacultyLogin';
import AdminLogin from './pages/AdminLogin';

import TeamDashboard from './pages/TeamDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Challenge from './pages/Challenge';
import Tracks from './pages/Tracks';
import Rules from './pages/Rules';
import TimelinePage from './pages/Timeline';
import FAQ from './pages/FAQ';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const LeaderboardWrapper = () => {
  return <Leaderboard />;
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<EventDetails />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/participation" element={<Participation />} />
          <Route path="/register" element={<RegisterTeam />} />
          <Route path="/faculty-register" element={<RegisterFaculty />} />
          <Route path="/login" element={<LoginSelection />} />
          <Route path="/team/login" element={<TeamLogin />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/leaderboard" element={<LeaderboardWrapper />} />

          {/* Protected Routes */}
          <Route path="/team/*" element={
            <ProtectedRoute allowedRoles={['TEAM']}>
              <TeamDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/faculty/*" element={
            <ProtectedRoute allowedRoles={['FACULTY']}>
              <FacultyDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {location.pathname !== '/' && <Footer />}
    </div>
  );
}

export default App;
