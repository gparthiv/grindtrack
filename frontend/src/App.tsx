import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;