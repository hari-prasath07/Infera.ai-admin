import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Make sure you have created this file

// Import Components & Pages
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login"; // Assuming Login component is in components folder
import ProtectedRoute from "./components/ProtectedRoute"; // Make sure you have created this file

import Dashboard from "./pages/Dashboard";
import Content from "./pages/Content";
import Product from "./pages/Product";
import Team from "./pages/Team";
import Media from "./pages/Media";
import Settings from "./pages/Settings";
import Career from "./pages/Careers";
import "./App.css";

/**
 * MainAppLayout component
 * This component defines the structure for the authenticated part of the app.
 * It includes the Navbar, Sidebar, and a space for the page content to be rendered.
 */
const MainAppLayout = () => {
  return (
    <div className="app">
      <Navbar /> {/* The Navbar will now get user/logout from context */}
      <div className="main-layout">
        <Sidebar className="sidebar" />
        <main className="dashboard-content">
          {/* Child routes (Dashboard, Content, etc.) will be rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/**
 * App component
 * This is the root component that sets up the application's routing.
 */
function App() {
  return (
    <AuthProvider> {/* Wraps the app to provide auth context */}
      <Router>
        <Routes>
          {/* Public Route: Anyone can access the login page */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes: Only authenticated users can access these */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainAppLayout />
              </ProtectedRoute>
            }
          >
            {/* These are the pages inside your main layout.
              The 'index' route is the default page when you go to '/'.
            */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content" element={<Content />} />
            <Route path="products" element={<Product />} />
            <Route path="team" element={<Team />} />
            <Route path="media" element={<Media />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/:tab" element={<Settings />} />
            <Route path="career" element={<Career />} />
          </Route>

          {/* Fallback for any route that doesn't match */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
