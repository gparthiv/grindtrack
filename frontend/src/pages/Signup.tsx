import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await fetch(
      "http://localhost:8000/api/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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

    console.log(data.message);

    // Signup successful → go to login
    navigate("/login");
  }

  return (
    <div className="pt-32 px-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="text-black dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
      />

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

      <button onClick={handleSignup} className="text-black dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400">
        Sign Up
      </button>
    </div>
  );
}

export default Signup;