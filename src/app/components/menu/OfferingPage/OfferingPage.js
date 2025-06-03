"use client";

import React, { useEffect, useState } from "react";

const OfferingPage = () => {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferings = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://f581c9bb-5ce0-4e12-b4c2-c2c04e2ed04a-00-3bemsrk26jok6.riker.replit.dev/getOfferingMenu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "oke" }),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setOfferings(data.result.menus || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOfferings();
  }, []);

  if (loading) return <p className="text-center text-[#723c16]">Loading offerings...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <main className="bg-[#fef6ee] min-h-screen text-[#723c16] py-10 px-6">
      <div className="max-w-6xl mx-auto bg-[#fff8f0] p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Special Offerings</h2>

        {offerings.length === 0 ? (
          <p className="text-center text-gray-600">No offerings available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {offerings.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition duration-300"
              >
                <div className="w-full h-40 bg-[#f3e9df] rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                  {item.urlImageOffering ? (
                    <img
                      src={item.urlImageOffering}
                      alt={item.titleOffering}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    "No image"
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.titleOffering}</h3>
                <p className="text-sm text-gray-600">{item.descOffering}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OfferingPage;
