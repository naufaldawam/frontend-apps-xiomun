"use client";

import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [preference, setPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendation("");
    setDisplayedText("");

    try {
      const response = await fetch("https://f581c9bb-5ce0-4e12-b4c2-c2c04e2ed04a-00-3bemsrk26jok6.riker.replit.dev/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preference }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.responseMessage || "Gagal mengambil rekomendasi.");
      }

      const text = data.result?.recommendation || "Tidak ada rekomendasi tersedia.";
      setRecommendation(text);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!recommendation) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    let displayed = "";
    setDisplayedText("");

    const interval = setInterval(() => {
      if (i < recommendation.length) {
        displayed += recommendation.charAt(i);
        setDisplayedText(displayed);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [recommendation]);

  return (
    <main className="min-h-screen bg-[#fef6ee] text-[#723c16] py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Cari Menu Sesuai Preferensimu 🍜
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              placeholder="Contoh: Saya ingin menu pedas dan mengenyangkan"
              rows={3}
              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#a35e20] transition"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`absolute right-3 bottom-3 px-4 py-1 rounded text-white transition
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#a35e20] hover:bg-[#723c16]"
                }`}
            >
              {loading ? "Memuat..." : "Kirim"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-6 space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}

        {displayedText && (
          <div className="mt-6 whitespace-pre-wrap font-mono text-[15px] leading-relaxed">
            {displayedText}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductPage;
