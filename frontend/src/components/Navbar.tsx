import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

type UserToken = {
  _id: string;
  name: string;
  email: string;
  exp: number;
};

function NavBar() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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

  function toggleDarkMode(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    const button = event.currentTarget;

    const x = button.getBoundingClientRect().left +
      button.getBoundingClientRect().width / 2;

    const y = button.getBoundingClientRect().top +
      button.getBoundingClientRect().height / 2;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      if (darkMode) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }

      setDarkMode(!darkMode);
      return;
    }

    const transition = document.startViewTransition(() => {
      if (darkMode) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }

      setDarkMode(!darkMode);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 350,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav
      className="
    fixed top-0 left-0 right-0 z-50
    flex justify-between items-center
    max-w-full
    py-6
    px-6 sm:px-10 md:px-16 lg:px-24 xl:px-80
    bg-slate-100 dark:bg-neutral-800
    border-b-2 border-slate-300 dark:border-neutral-700
  "
    >
      {/* TITLE */}
      <div className="flex items-center">
        <img
          src={darkMode ? logoDark : logoLight}
          alt="GrindTrack"
          className="h-10 w-auto object-contain"
        />
        <span className="ml-4 text-3xl font-extrabold tracking-tight text-black dark:text-white">
          GrindTrack
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {user && location.pathname !== "/" ? (
          <>
            <span className="text-black dark:text-white">
              {user.name}
            </span>

            <Link
              to="/dashboard"
              className="text-black dark:text-white hover:text-green-600"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="
          text-black dark:text-white
          hover:text-red-500
          cursor-pointer
        "
            >
              Logout
            </button>
          </>
        ) : !user ? (
          <Link
            to="/"
            className="text-black dark:text-white hover:text-green-600"
          >
            Login
          </Link>
        ) : null}

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