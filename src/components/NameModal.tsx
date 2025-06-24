"use client";

import { useState } from "react";

export default function NameModal({
  onSubmit,
}: {
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-purple-700 p-6 rounded-2xl max-w-sm w-full text-center shadow-xl">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">
          📝 Enter Your Name
        </h2>
        <input
          type="text"
          value={name}
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={() => onSubmit(name.trim() || "Guest")}
          className="mt-4 bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full hover:bg-yellow-500 transition"
        >
          ✅ Submit
        </button>
      </div>
    </div>
  );
}
