import { Moon, Sun } from "lucide-react";
import { useState } from "react";

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    if (darkMode)
      document.documentElement.classList.remove('dark');
    else
      document.documentElement.classList.add('dark');
    setDarkMode(!darkMode);

  }
  return (
    <nav className="
    fixed top-0 left-0 right-0 z-50
    flex justify-between items-center 
    max-w-full py-8 px-80
    bg-slate-100 dark:bg-neutral-800 border-b-2 border-slate-300 dark:border-neutral-700">
      <div className="text-black dark:text-white">TITLE</div>
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
    </nav>
  );
}

export default NavBar;