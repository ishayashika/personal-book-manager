"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          href="/dashboard"
          className="text-2xl font-bold text-white"
        >
          📚 Book Manager
        </Link>

        <div className="flex items-center gap-4">

          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/add-book"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
          >
            + Add Book
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}