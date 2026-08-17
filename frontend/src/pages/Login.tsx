import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch(
      `${API_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    // Store JWT
    localStorage.setItem("token", data.token);

    console.log("Login successful");

    navigate("/");
  }

  return (
    <div className="pt-32 px-6">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="text-black dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="text-black dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
      />

      <button onClick={handleLogin} className="text-black dark:text-white">
        Login
      </button>
    </div>
  );
}

export default Login;