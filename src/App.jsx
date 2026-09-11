import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import LoadingScreen from './components/common/LoadingScreen';
import Navbar from './components/common/Navbar';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MaintenancePage from './pages/MaintenancePage';
import { AUTH_MAINTENANCE_MODE } from './constants/app';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import LearningPage from './pages/LearningPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <h2 className="text-5xl font-display font-black text-black dark:text-white uppercase">
          Loading...
        </h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthRoute = () => (AUTH_MAINTENANCE_MODE ? <MaintenancePage /> : <LoginPage />);
const RegisterAuthRoute = () => (AUTH_MAINTENANCE_MODE ? <MaintenancePage /> : <RegisterPage />);

const AppRoutes = () => {
  const location = useLocation();
  const isAuthMaintenanceRoute =
    AUTH_MAINTENANCE_MODE &&
    (location.pathname === '/login' || location.pathname === '/register');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      {!isAuthMaintenanceRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthRoute />} />
        <Route path="/register" element={<RegisterAuthRoute />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subject/:slug" element={<SubjectDetailPage />} />
        <Route path="/learn/:sourceId" element={<LearningPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoading', 'true');
    setShowLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
