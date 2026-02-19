"use client";

import { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  imagePath: string;
  createdAt: string;
}

export default function GallerySection() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  // Fetch gallery items
  const loadGalleryItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error("Error loading gallery items:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.title || !formData.image) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image!);

    const res = await fetch("/api/gallery", {
      method: "POST",
      body: data,
    });

    setLoading(false);

    if (res.ok) {
      alert("Gallery item uploaded successfully!");
      setFormData({ title: "", description: "", image: null });
      setPreview(null);
      loadGalleryItems(); // Refresh the gallery
    } else {
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setGalleryItems((items) => items.filter((item) => item.id !== id));
        alert("Image deleted successfully!");
      } else {
        alert("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Gallery Management</h1>
        <p className="text-muted-foreground">Upload and manage gallery images</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-xl shadow border space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Image</h2>
        
        <input
          type="text"
          placeholder="Enter Image Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full border p-2 rounded-md"
          required
        />

        <textarea
          placeholder="Enter Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded-md"
          rows={3}
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded-md"
          required
        />

        {/* Image Preview */}
        {preview && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-md border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* Gallery Display Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Uploaded Images</h2>

        {fetchLoading ? (
          <p className="text-gray-500">Loading gallery...</p>
        ) : galleryItems.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
              >
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.svg';
                  }}
                />

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                {item.description && (
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                )}

                <p className="text-xs text-gray-400 mb-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
