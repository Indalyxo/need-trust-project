"use client";

import { useState } from "react";

export default function CertificateSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !photo) {
      alert("Title and Photo are required!");
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
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Certificate</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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

        {/* Description */}
        <div>
          <label className="block font-medium">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter description"
          ></textarea>
        </div>

        {/* Photo */}
        <div>
          <label className="block font-medium">Upload Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="w-full cursor-pointer"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Submit Certificate
        </button>
      </form>
    </div>
  );
}
