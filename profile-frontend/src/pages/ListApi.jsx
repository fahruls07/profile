import { useEffect, useState } from "react";
import axios from "axios";

export default function ListApi() {
  const [endpoints, setEndpoints] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/list")
      .then((res) => {
        setEndpoints(res.data.availableEndpoints || {});
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setError("❌ Sorry, List-API is disabled");
        } else {
          setError("⚠️ Failed to fetch List-API");
        }
      });
  }, []);

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">{error}</p>
    );
  }

  if (!endpoints) {
    return <p className="text-center mt-10">Loading API list...</p>;
  }

  // Warna badge per method
  const methodColors = {
    GET: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    POST: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📌 Available API</h1>
      <div className="space-y-6">
        {Object.entries(endpoints).map(([section, methods], idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl shadow-md bg-white/80 dark:bg-gray-800/70"
          >
            <h2 className="text-xl font-semibold mb-4 capitalize text-orange-500">
              {section}
            </h2>
            <ul className="space-y-3">
              {Object.entries(methods).map(([method, path], i) => {
                const upper = method.toUpperCase();
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${methodColors[upper] || "bg-gray-200 text-gray-800"}`}
                    >
                      {upper}
                    </span>
                    <span className="ml-4 text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                      {path}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
