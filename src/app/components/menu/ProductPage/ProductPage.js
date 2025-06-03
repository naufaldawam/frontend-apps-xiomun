"use client";

import React, { useState } from "react";

const ProductPage = () => {
  const [preference, setPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendation("");

    try {
      const response = await fetch(
        "https://f581c9bb-5ce0-4e12-b4c2-c2c04e2ed04a-00-3bemsrk26jok6.riker.replit.dev/recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preference }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.responseMessage || "Gagal mengambil rekomendasi.");
      }

      setRecommendation(data.result?.recommendation || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulasi efek mengetik
  const [displayedText, setDisplayedText] = useState("");
  React.useEffect(() => {
    if (recommendation) {
      let i = 0;
      setDisplayedText("");
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + recommendation[i]);
        i++;
        if (i >= recommendation.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
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
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 bg-[#a35e20] text-white px-4 py-1 rounded hover:bg-[#723c16] transition"
            >
              Kirim
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
