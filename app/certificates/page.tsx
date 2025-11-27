"use client";

import { useEffect, useState } from "react";

interface Certificate {
  id: number;
  title: string;
  description: string | null;
  image: string;
  createdAt: string;
}

export default function UserCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCertificates = async () => {
    const res = await fetch("/api/certificates/list");
    const data = await res.json();

    if (data.success) {
      setCertificates(data.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Certificates</h1>

      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                {item.description && (
                  <p className="text-gray-600 mt-2">{item.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
