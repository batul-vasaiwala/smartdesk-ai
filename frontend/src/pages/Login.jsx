import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveAuth } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      return setError("Please fill all fields.");
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
      });

      const { token, user } = res.data;

      saveAuth(token, user);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-600">
            SmartDesk AI
          </h1>

          <p className="mt-2 text-gray-500">
            AI Powered Support System
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div>

            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-500">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Customer Account
          </Link>

        </div>

      </div>

    </div>
  );
}