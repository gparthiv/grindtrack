import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <NavBar />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route path="/login" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;