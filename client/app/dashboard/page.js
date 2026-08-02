"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [books, setBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const deleteBook = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/books/${id}`);

      await fetchDashboard();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };
  const fetchDashboard = async () => {
    try {
      // Dashboard statistics
      const dashboardResponse = await api.get("/books/dashboard");
      setDashboard(dashboardResponse.data);

      // User books
      const booksResponse = await api.get("/books");
      setBooks(booksResponse.data.books);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchDashboard();
  }, []);

  const filteredBooks = books.filter((book) => {
    const statusMatch = statusFilter === "" || book.status === statusFilter;

    const tagMatch =
      tagFilter === "" ||
      book.tags.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase()),
      );

    return statusMatch && tagMatch;
  });

  if (!dashboard) {
    return (
      <h1 className="text-center text-2xl mt-20 font-semibold">Loading...</h1>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard 📚</h1>

        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="border rounded-lg p-5 shadow">
            <h2 className="text-gray-500">Total Books</h2>
            <p className="text-3xl font-bold">
              {dashboard.dashboard.totalBooks}
            </p>
          </div>

          <div className="border rounded-lg p-5 shadow">
            <h2 className="text-gray-500">Want To Read</h2>
            <p className="text-3xl font-bold">
              {dashboard.dashboard.wantToRead}
            </p>
          </div>

          <div className="border rounded-lg p-5 shadow">
            <h2 className="text-gray-500">Reading</h2>
            <p className="text-3xl font-bold">{dashboard.dashboard.reading}</p>
          </div>

          <div className="border rounded-lg p-5 shadow">
            <h2 className="text-gray-500">Completed</h2>
            <p className="text-3xl font-bold">
              {dashboard.dashboard.completed}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search by tag..."
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-full md:w-80 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            <option value="">All Status</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {/* Books Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Books</h2>

          <Link href="/add-book">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              + Add Book
            </button>
          </Link>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">
              No books found. Add your first book!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="border rounded-lg p-5 flex justify-between items-center shadow-sm"
              >
                <div>
                  <h3 className="text-xl font-semibold">{book.title}</h3>

                  <p className="text-gray-600">{book.author}</p>

                  <p className="text-sm text-gray-500 mt-1">
                    Tags: {book.tags.join(", ")}
                  </p>

                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      book.status === "Completed"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : book.status === "Reading"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <div className="space-x-2">
                  <Link
                    href={`/edit-book/${book._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
