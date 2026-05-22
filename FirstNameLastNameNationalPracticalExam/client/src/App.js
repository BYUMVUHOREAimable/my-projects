import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext'; // Custom hook for auth state
import Navbar from './components/layout/Navbar'; // Navigation bar
import Login from './components/auth/Login'; // Login page
import Register from './components/auth/Register'; // Register page
import ProductList from './components/products/ProductList'; // List of products
import ProductForm from './components/products/ProductForm'; // Form for adding/editing products
import StockStatus from './components/stock/StockStatus'; // View stock status
import StockMovements from './components/stock/StockMovements'; // View stock movements
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

// PrivateRoute ensures only authenticated users can access protected routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Display a loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authenticated, render children, otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated, loading } = useAuth(); // Accessing authentication state from context

  useEffect(() => {
    // Example toast notifications on mount (you can trigger these based on actions)
    if (isAuthenticated) {
      toast.success('Successfully logged in!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar will adjust based on authentication status */}
      <Navbar />
      
      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Only accessible if authenticated) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/new"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id/edit"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/stock/status"
            element={
              <PrivateRoute>
                <StockStatus />
              </PrivateRoute>
            }
          />
        
          <Route
            path="/stock/movements"
            element={
              <PrivateRoute>
                <StockMovements />
              </PrivateRoute>
            }
          />

          {/* Catch-all route (redirects to the home page if no matching route) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Toast Container to show notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
