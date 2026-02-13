"use client";

import { useEffect, useState } from "react";
import { getInlineViewUrl } from "@/lib/cloudinary-utils";

interface Certificate {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export default function CertificateSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For fullscreen modal (images and PDFs)
  const [selectedMedia, setSelectedMedia] = useState<{ url: string, isPdf: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then(async (res) => {
        try {
          const data = await res.json();
          if (data.success) setCertificates(data.data);
        } catch (err) {
          setError("Failed to load certificates.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Server error while fetching certificates.");
        setLoading(false);
      });
  }, []);

  const isPdf = (url: string) => {
    return url.includes('/raw/upload/') || url.includes('.pdf');
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading certificates...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-8 text-center">Certificates</h1>

      {certificates.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No certificates uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="border rounded-xl shadow-lg hover:shadow-2xl transition p-5 bg-white"
            >
              {/* Check if it's a PDF */}
              {isPdf(cert.image) ? (
                <div
                  className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                  onClick={() => setSelectedMedia({ url: cert.image, isPdf: true })}
                >
                  <div className="text-center">
                    <svg className="w-20 h-20 text-red-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600 font-medium">Click to view PDF</p>
                  </div>
                </div>
              ) : (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedMedia({ url: cert.image, isPdf: false })}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.svg';
                  }}
                />
              )}

              <h2 className="mt-4 text-2xl font-semibold">{cert.title}</h2>

              {cert.description && (
                <p className="text-gray-700 text-base mt-2">{cert.description}</p>
              )}

              <p className="text-sm text-gray-400 mt-3">
                {new Date(cert.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal for Images and PDFs */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10 bg-red-500 rounded-full w-12 h-12 flex items-center justify-center"
          >
            ×
          </button>

          {selectedMedia.isPdf ? (
            <div
              className="w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Use Google Docs Viewer for better PDF rendering */}
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedMedia.url)}&embedded=true`}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </div>
          ) : (
            <img
              src={selectedMedia.url}
              alt="Full Screen"
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
}
