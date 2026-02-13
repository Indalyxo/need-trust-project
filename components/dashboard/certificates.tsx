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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  
  // PDF viewer modal state
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);

  // Fetch certificates
  const loadCertificates = async () => {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    if (data.success) {
      setCertificates(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !photo) {
      alert("Title and File are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo", photo);

    const res = await fetch("/api/certificates", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Certificate added successfully!");
      setTitle("");
      setDescription("");
      setPhoto(null);
      loadCertificates(); // refresh certificates
    } else {
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    const res = await fetch(`/api/certificates/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.message || data.success) {
      setCertificates((s) => s.filter((c) => c.id !== id));
      alert("Deleted successfully");
    } else {
      alert("Failed to delete");
    }
  };

  const startEdit = (cert: Certificate) => {
    setEditId(cert.id);
    setEditTitle(cert.title);
    setEditDescription(cert.description || "");
    setEditPhoto(null);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPhoto(null);
  };

  const saveEdit = async (id: number) => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    if (editPhoto) formData.append("photo", editPhoto);

    const res = await fetch(`/api/certificates/${id}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Updated successfully");
      cancelEdit();
      loadCertificates();
    } else {
      alert("Failed to update");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">

      {/* Upload Form */}
      <div className="w-full max-w-xl bg-white p-6 shadow rounded-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Certificate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Certificate Title"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Upload File (image or PDF) *</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="w-full cursor-pointer"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
          >
            Submit Certificate
          </button>
        </form>
      </div>

      {/* Certificate Display Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Uploaded Certificates</h1>

        {loading ? (
          <p>Loading...</p>
        ) : certificates.length === 0 ? (
          <p className="text-gray-500">No certificates uploaded yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-3 bg-white"
              >
                {/* Check if it's a PDF by URL pattern or file extension */}
                {cert.image && (
                  cert.image.includes('/raw/upload/') || 
                  cert.image.includes('.pdf') ||
                  cert.image.match(/\/upload\/v\d+\/certificates\/[^/]+\.pdf/i)
                ) ? (
                  <div 
                    className="w-full h-48 flex flex-col items-center justify-center rounded bg-gray-100 gap-3 cursor-pointer hover:bg-gray-200 transition"
                    onClick={() => setViewingPdf(cert.image)}
                  >
                    <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <p className="text-blue-600 hover:text-blue-800 font-medium">
                      Click to View PDF
                    </p>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-48 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.svg';
                    }}
                  />
                )}

                {editId === cert.id ? (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border p-2 rounded mb-2"
                    />

                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full border p-2 rounded mb-2"
                    />

                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setEditPhoto(e.target.files?.[0] || null)}
                      className="w-full mb-2"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(cert.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 text-black px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="mt-3 text-lg font-semibold">{cert.title}</h2>

                    {cert.description && (
                      <p className="text-gray-600 text-sm mt-2">{cert.description}</p>
                    )}

                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(cert.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => startEdit(cert)}
                        className="bg-yellow-400 text-black px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setViewingPdf(null)}
        >
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingPdf(null)}
              className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
            {/* Use Google Docs Viewer for better PDF rendering */}
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewingPdf)}&embedded=true`}
              className="w-full h-full"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
