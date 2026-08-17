import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await fetch(
        "http://localhost:8000/api/users/login",
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

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  async function handleSignup() {
    try {
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

      // Switch back to login after signup
      setIsSignup(false);
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Signup failed", error);
    }
  }

  return (
    <main className="min-h-screen pt-32 px-6 mt-16">

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 px-6">

        {/* LEFT HERO */}
        <section className="w-1/2">

          <h1 className="text-5xl font-extrabold text-black dark:text-white">
            Track your grind.
            <br />
            <span className="text-green-500">
              Build your streak.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Keep your daily learning organized, track what you complete,
            and build consistency one day at a time.
          </p>

        </section>


        {/* AUTH BOX */}
        <section className="w-1/2 flex justify-center">

          <div
            className="
            w-full max-w-sm
            px-8 py-10
            rounded-xl
            border border-slate-200
            dark:border-neutral-700
            bg-white dark:bg-neutral-900
            shadow-sm
          "
          >

            <h2 className="text-3xl font-[700] text-black dark:text-white">
              {isSignup ? "Create account" : "Welcome back"}
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {isSignup
                ? "Start tracking your progress."
                : "Continue your learning journey."}
            </p>


            {/* NAME — SIGNUP ONLY */}
            {isSignup && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="
                mt-8 w-full px-4 py-3 rounded-md
                border border-slate-300 dark:border-neutral-700
                bg-transparent
                text-black dark:text-white
                placeholder:text-slate-500
                dark:placeholder:text-slate-400
                outline-none
                focus:border-green-500
              "
              />
            )}


            {/* EMAIL */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="
              mt-4 w-full px-4 py-3 rounded-md
              border border-slate-300 dark:border-neutral-700
              bg-transparent
              text-black dark:text-white
              placeholder:text-slate-500
              dark:placeholder:text-slate-400
              outline-none
              focus:border-green-500
            "
            />


            {/* PASSWORD */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
              mt-4 w-full px-4 py-3 rounded-md
              border border-slate-300 dark:border-neutral-700
              bg-transparent
              text-black dark:text-white
              placeholder:text-slate-500
              dark:placeholder:text-slate-400
              outline-none
              focus:border-green-500
            "
            />


            {/* ACTION */}
            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="
              mt-6 w-full py-3 rounded-md
              bg-green-500 hover:bg-green-600
              text-white font-[600]
              cursor-pointer
              transition-colors
            "
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>


            {/* SWITCH */}
            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">

              {isSignup ? (
                <>
                  Already a user?{" "}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="
                    text-green-500
                    hover:text-green-600
                    font-[600]
                    cursor-pointer
                  "
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Not a user?{" "}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="
                    text-green-500
                    hover:text-green-600
                    font-[600]
                    cursor-pointer
                  "
                  >
                    Sign Up
                  </button>
                </>
              )}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Home;