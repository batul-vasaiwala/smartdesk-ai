import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, saveAuth } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return setError("Please fill all fields.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      saveAuth(res.data.token, res.data.user);

      navigate("/customer");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed."
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

          <p className="text-gray-500 mt-2">
            Create your customer account
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

          <div>

            <label>Name</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Enter full name"
            />

          </div>

          <div>

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Enter email"
            />

          </div>

          <div>

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Create password"
            />

          </div>

          <div>

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Confirm password"
            />

          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-500">
            Already have an account?
          </p>

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}