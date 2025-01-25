import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';







// Lazy load components
const Safety = React.lazy(() => import('./pages/Safety'));
const Projects = React.lazy(() => import('./pages/Projects'));
const LabRecords = React.lazy(() => import('./pages/LabRecords'));
const Resources = React.lazy(() => import('./pages/Resources'));
const LostFound = React.lazy(() => import('./pages/LostFound'));
const News = React.lazy(() => import('./pages/News'));
const Alumni = React.lazy(() => import('./pages/Alumni'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Home = React.lazy(() => import('./pages/Home'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              }
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/safety"
                  element={
                    <PrivateRoute>
                      <Safety />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PrivateRoute>
                      <Projects />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/lab-records"
                  element={
                    <PrivateRoute>
                      <LabRecords />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <PrivateRoute>
                      <Resources />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/lost-found"
                  element={
                    <PrivateRoute>
                      <LostFound />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/news"
                  element={
                    <PrivateRoute>
                      <News />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/alumni"
                  element={
                    <PrivateRoute>
                      <Alumni />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </React.Suspense>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;