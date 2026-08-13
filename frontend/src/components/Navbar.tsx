import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type UserToken = {
  _id: string;
  name: string;
  email: string;
  exp: number;
};

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let user: UserToken | null = null;

  if (token) {
    try {
      user = jwtDecode<UserToken>(token);
    } catch (error) {
      console.log("Invalid token");
      localStorage.removeItem("token");
    }
  }

  function toggleDarkMode() {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    setDarkMode(!darkMode);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        flex justify-between items-center
        max-w-full py-8 px-80
        bg-slate-100 dark:bg-neutral-800
        border-b-2 border-slate-300 dark:border-neutral-700
      "
    >
      {/* TITLE */}
      <div className="text-black dark:text-white">
        TITLE
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {user ? (
          <>
            <span className="text-black dark:text-white">
              {user.name}
            </span>

            <Link
              to="/"
              className="text-black dark:text-white hover:text-green-600"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="text-black dark:text-white hover:text-red-500 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-black dark:text-white hover:text-green-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-black dark:text-white hover:text-green-600"
            >
              Signup
            </Link>
          </>
        )}

        {/* DARK MODE */}
        <button
          onClick={toggleDarkMode}
          className="cursor-pointer text-black dark:text-yellow-400"
        >
          {darkMode ? (
            <Sun size={24} />
          ) : (
            <Moon size={24} />
          )}
        </button>

      </div>
    </nav>
  );
}

export default NavBar;