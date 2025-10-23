// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/protectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* All other routes inside MainLayout */}
      <Route path="/*" element={<MainLayout />}>
        {/* Index route – מוצג כברירת מחדל */}
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* אפשר להוסיף עוד routes פנימיים */}
        {/* <Route
          path="somepage"
          element={
            <ProtectedRoute>
              <SomePage />
            </ProtectedRoute>
          }
        /> */}

        {/* Route לכל השאר */}
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
}
