"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

export default function AddBook() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    tags: "",
    status: "Want to Read",
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
      await api.post("/books", {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      });

      alert("Book added successfully!");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-10">
          <h1 className="text-5xl font-bold text-center text-white mb-10">
            📚 Add Book
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Atomic Habits"
                required
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="James Clear"
                required
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Self Help, Productivity"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-slate-300 font-medium mb-2">
                Reading Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="Want to Read">📖 Want to Read</option>
                <option value="Reading">📘 Reading</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex-1 rounded-xl border border-slate-600 py-4 text-white hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 transition"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
