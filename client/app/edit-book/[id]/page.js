"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";
import Navbar from "../../../components/Navbar";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    tags: "",
    status: "Want to Read",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get("/books");

        const book = response.data.books.find((b) => b._id === id);

        if (!book) {
          alert("Book not found");
          router.push("/dashboard");
          return;
        }

        setFormData({
          title: book.title,
          author: book.author,
          tags: book.tags.join(", "),
          status: book.status,
        });

        setLoading(false);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchBook();
  }, [id, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/books/${id}`, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      });

      alert("Book updated successfully!");

      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update book");
    }
  };

  if (loading) {
    return <h1 className="text-center text-2xl mt-20">Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-[#111111] border border-gray-700 rounded-2xl shadow-xl p-10">
          <h1 className="text-4xl font-bold text-center text-white mb-10">
            ✏️ Edit Book
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Book Title"
                required
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author Name"
                required
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Self Help, Productivity"
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Want to Read</option>
                <option>Reading</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
