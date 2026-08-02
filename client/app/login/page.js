"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      console.log(response.data);

      // Save JWT
      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border rounded-lg p-6 shadow"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full p-3 rounded"
        >
          Login
        </button>
        <p className="text-center mt-5 text-gray-400">
          New user?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-400 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
