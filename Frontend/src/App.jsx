import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Invite from "./components/Invite";
import axios from "axios";

// Protected Route wrapper
const PrivateRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  // auto-login from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  return (

    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setUser={setUser} />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <Home user={user} />
          </PrivateRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <PrivateRoute user={user}>
            <Notes />
          </PrivateRoute>
        }
      />
      <Route
        path="/invite"
        element={
          <PrivateRoute user={user}>
            {user?.role === "admin" ? <Invite /> : <Navigate to="/" />}
          </PrivateRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>

  );
}

export default App;
