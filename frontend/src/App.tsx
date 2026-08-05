import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-[200vh] bg-white dark:bg-neutral-900">
      <NavBar />
      <Dashboard />
    </div>
  );
}

export default App;