import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';

import Projects from './pages/Projects';
import GeoSpatialView from './pages/GeoSpatialView';
import AIInsights from './pages/AIInsights';
import BudgetPlanner from './pages/BudgetPlanner';
import Login from './pages/Login';
import PublicComplaint from './pages/PublicComplaint';
import Chatbot from './components/Chatbot';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If citizen tries to access admin/official dashboard, bounce them to their portal
    if (user.role === 'citizen') {
      return <Navigate to="/public-complaint" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/public-complaint" element={<ProtectedRoute allowedRoles={['citizen', 'admin', 'official']}><PublicComplaint /></ProtectedRoute>} />
        <Route path="/" element={
          <ProtectedRoute allowedRoles={['official', 'admin']}>
            <>
              <Layout />
              <Chatbot />
            </>
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="projects" element={<Projects />} />
          <Route path="map" element={<GeoSpatialView />} />
          <Route path="insights" element={<AIInsights />} />
          <Route path="budget" element={<BudgetPlanner />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
