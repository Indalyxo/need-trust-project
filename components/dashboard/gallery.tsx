"use client";
import { useState } from "react";

export default function GallerySection() {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image || !formData.title) return alert("Please fill all fields");

    const newItem = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      imageURL: URL.createObjectURL(formData.image),
    };

    setGallery([...gallery, newItem]);

    setFormData({
      title: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="space-y-10">

      {/* ---------------------- PAGE TITLE ------------------------ */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Gallery</h1>
        <p className="text-muted-foreground">
          Moments from our journey and achievements
        </p>
      </div>

      {/* ---------------------- USER INPUT FORM ------------------------ */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-xl shadow-md space-y-4 border"
      >
        <h2 className="text-xl font-semibold">Add New Gallery Item</h2>

        <input
          type="text"
          placeholder="Enter Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border p-2 rounded-md"
          required
        />

        <textarea
          placeholder="Enter Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="w-full border p-2 rounded-md"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Upload
        </button>
      </form>

      {/* ---------------------- GALLERY GRID ------------------------ */}
    
      

    </div>
  );
}
