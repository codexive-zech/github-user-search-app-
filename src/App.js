import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // auth-wrapper handles display when authentication is successful
    <AuthWrapper>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              // wrapping the dashboard into a private route, must be authenticated to access it
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;
