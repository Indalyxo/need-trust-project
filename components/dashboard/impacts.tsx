"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit2, X, Check } from "lucide-react";

interface Impact {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  icon: string;
  statsValue: string;
  statsLabel: string;
}

const iconOptions = ["Users", "Heart", "Award", "GraduationCap"];

export default function ImpactsAdmin() {
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Users",
    statsValue: "",
    statsLabel: "",
    image: null as File | null,
  });

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    icon: "Users",
    statsValue: "",
    statsLabel: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // Load impacts
  useEffect(() => {
    loadImpacts();
  }, []);

  const loadImpacts = async () => {
    try {
      const res = await fetch("/api/impacts");
      const json = await res.json();
      if (json.success) {
        setImpacts(json.data);
      }
    } catch (error) {
      alert("Failed to load impacts");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.statsValue ||
      !formData.statsLabel ||
      !formData.image
    ) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("icon", formData.icon);
      data.append("statsValue", formData.statsValue);
      data.append("statsLabel", formData.statsLabel);
      data.append("image", formData.image);

      const res = await fetch("/api/impacts", {
        method: "POST",
        body: data,
      });

      setLoading(false);

      if (res.ok) {
        alert("Impact uploaded successfully!");
        setFormData({
          title: "",
          description: "",
          icon: "Users",
          statsValue: "",
          statsLabel: "",
          image: null,
        });
        setPreview(null);
        loadImpacts();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      alert("Failed to upload impact");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this impact?")) return;

    try {
      const res = await fetch(`/api/impacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Impact deleted successfully!");
        loadImpacts();
      } else {
        alert("Failed to delete impact");
      }
    } catch (error) {
      alert("Failed to delete impact");
    }
  };

  const startEdit = (impact: Impact) => {
    setEditId(impact.id);
    setEditData({
      title: impact.title,
      description: impact.description,
      icon: impact.icon,
      statsValue: impact.statsValue,
      statsLabel: impact.statsLabel,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = async (id: number) => {
    try {
      const res = await fetch(`/api/impacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        alert("Impact updated successfully!");
        setEditId(null);
        loadImpacts();
      } else {
        alert("Failed to update impact");
      }
    } catch (error) {
      alert("Failed to update impact");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Impacts</h1>
        <p className="text-gray-600">Upload and manage impact stories</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold">Add New Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {iconOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Stats Value (e.g., 50+)"
            value={formData.statsValue}
            onChange={(e) => setFormData({ ...formData, statsValue: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            placeholder="Stats Label"
            value={formData.statsLabel}
            onChange={(e) => setFormData({ ...formData, statsLabel: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="cursor-pointer">
            {preview ? (
              <div className="space-y-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mx-auto rounded-lg"
                />
                <p className="text-sm text-gray-600">Click to change image</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <p className="text-lg font-semibold">Click to upload image</p>
                <p className="text-sm">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Impact"}
        </button>
      </form>

      {/* Impacts List */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Impacts List</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map((impact) =>
            editId === impact.id ? (
              <div
                key={impact.id}
                className="border-2 border-orange-500 rounded-lg p-4 space-y-3 bg-orange-50"
              >
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-3 py-1 border rounded text-sm"
                  placeholder="Title"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full px-3 py-1 border rounded text-sm"
                  rows={3}
                  placeholder="Description"
                />
                <select
                  value={editData.icon}
                  onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
                  className="w-full px-3 py-1 border rounded text-sm"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={editData.statsValue}
                  onChange={(e) => setEditData({ ...editData, statsValue: e.target.value })}
                  className="w-full px-3 py-1 border rounded text-sm"
                  placeholder="Stats Value"
                />
                <input
                  type="text"
                  value={editData.statsLabel}
                  onChange={(e) => setEditData({ ...editData, statsLabel: e.target.value })}
                  className="w-full px-3 py-1 border rounded text-sm"
                  placeholder="Stats Label"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(impact.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-1"
                  >
                    <Check size={16} /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-1"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={impact.id} className="border rounded-lg p-4 space-y-3 hover:shadow-lg transition">
                <img
                  src={impact.imagePath}
                  alt={impact.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-bold text-lg text-gray-900">{impact.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-2">{impact.description}</p>
                <div className="text-sm text-orange-600 font-semibold">
                  {impact.statsValue} - {impact.statsLabel}
                </div>
                <div className="text-xs text-gray-500">Icon: {impact.icon}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(impact)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(impact.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {impacts.length === 0 && (
          <p className="text-center text-gray-500">No impacts uploaded yet</p>
        )}
      </div>
    </div>
  );
}
