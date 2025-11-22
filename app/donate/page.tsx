"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Heart,
  QrCode,
  CheckCircle2,
  X,
  Mail,
  CreditCard,
  FileText,
} from "lucide-react";
import CustomButton from "@/components/custom/custom-button";
import Navbar from "@/components/custom/navigation-menu";

export default function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    panNumber: "",
    transactionId: "",
  });

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // cleanup for blob URLs
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Upload only image files (PNG, JPG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);

    setProofFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  // Remove file
  const removeImage = () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setProofFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() ||
        !formData.email.trim() ||
        !formData.amount.trim() ||
        !formData.panNumber.trim() ||
        !formData.transactionId.trim() ||
        !proofFile) {
      setError("Please fill all fields & upload screenshot");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid Email Address");
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError("Enter a valid donation amount");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Upload screenshot first
      const fileFormData = new FormData();
      fileFormData.append("file", proofFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fileFormData,
      });

      if (!uploadRes.ok) throw new Error("Error uploading proof image");

      const uploadData = await uploadRes.json();

      // Create donation record
      const donateRes = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          proofImageUrl: uploadData.imageUrl,
        }),
      });

      if (!donateRes.ok) {
        const errData = await donateRes.json().catch(() => ({}));
        throw new Error(errData.error || "Error saving donation");
      }

      // success UI
      setSuccess("Donation submitted successfully! We will verify and contact you.");
      setTimeout(() => setSuccess(null), 5000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        amount: "",
        panNumber: "",
        transactionId: "",
      });
      removeImage();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-10 px-4 lg:px-20 bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">

        {/* TOP Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
            <Heart className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-sm font-semibold text-orange-600">
              Support Our Mission
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Make a Donation
          </h1>

          <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
            Every contribution matters. Scan the QR or fill the form to donate.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* QR Box */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500 rounded-lg">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Scan to Donate</h3>
            </div>

            <motion.div
              className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-xl p-6 flex justify-center"
              whileHover={{ scale: 1.02 }}
            >
              {showQR ? (
                <img
                  src="https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763184799/Screenshot_2025-11-15_110257_vuttqc.png"
                  alt="QR"
                  className="w-72 h-72 rounded-xl shadow-lg"
                />
              ) : (
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-orange-300 mx-auto mb-4" />
                  <p className="text-gray-500">Click to show QR Code</p>
                </div>
              )}
            </motion.div>

            <CustomButton
              onClick={() => setShowQR(!showQR)}
              className="mt-5 w-full py-3 rounded-xl bg-orange-500 text-white"
            >
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </CustomButton>
          </div>

          {/* Donation Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-orange-600" />
              Donation Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-semibold text-gray-700 text-sm mb-2 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name (as per PAN)"
                  className="w-full px-4 py-3 border rounded-lg border-orange-200"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold text-gray-700 text-sm mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full pl-10 py-3 border rounded-lg border-orange-200"
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="font-semibold text-gray-700 text-sm mb-2 block">Donation Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-orange-600 font-bold">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-10 py-3 border rounded-lg border-orange-200"
                    required
                  />
                </div>
              </div>

              {/* PAN */}
              <div>
                <label className="font-semibold text-gray-700 text-sm mb-2 block">PAN Card Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="ABCDE1234F"
                  className="w-full px-4 py-3 border rounded-lg border-orange-200 uppercase"
                  required
                />
              </div>

              {/* Transaction Id */}
              <div>
                <label className="font-semibold text-gray-700 text-sm mb-2 block">Transaction ID</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="UPI Transaction ID"
                    className="w-full pl-10 py-3 border rounded-lg border-orange-200"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="font-semibold text-gray-700 text-sm mb-2 block">Transaction Screenshot</label>

                {!previewUrl ? (
                  <div
                    className="border-2 border-dashed border-orange-300 rounded-xl p-6 cursor-pointer bg-orange-50 text-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 mx-auto text-orange-500 mb-2" />
                    <p>Upload Screenshot (PNG/JPG)</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img src={previewUrl} className="w-full rounded-xl border border-orange-200" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-3 rounded-lg font-semibold mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Confirm Donation"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}