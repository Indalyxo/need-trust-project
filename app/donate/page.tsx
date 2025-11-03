"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    panNumber: "",
    transactionId: "",
    transactionScreenshot: "",
  });
  const [showQR, setShowQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // 👈 popup state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.amount && formData.panNumber && formData.transactionId && formData.transactionScreenshot) {
      setSubmitted(true);
      setShowPopup(true);

      // Reset after delay
      setTimeout(() => {
        setFormData({ name: "", amount: "", panNumber: "", transactionId: "" ,transactionScreenshot: ""});
        setSubmitted(false);
      }, 3000);

      // Auto-close popup
      setTimeout(() => setShowPopup(false), 4000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-white">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Title */}
        <motion.div className="text-center mb-16" variants={itemVariants} custom={0}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support our mission to create positive change. Choose your preferred payment method and contribute today.
          </p>
        </motion.div>

        {/* Payment Container */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* QR Section */}
          <motion.div className="flex flex-col items-center justify-center" variants={itemVariants} custom={1}>
            <div className="shadow-lg p-8 w-full max-w-sm rounded-xl bg-white border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Scan to Donate</h3>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg flex items-center justify-center mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {showQR ? (
                  <img src={"/placeholder.svg"} alt="Donation QR Code" className="w-48 h-48" />
                ) : (
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>

              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md"
              >
                {showQR ? "Hide QR Code" : "Show QR Code"}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Scan with your mobile device to make a quick donation
              </p>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div className="flex flex-col" variants={itemVariants} custom={2}>
            <div className="shadow-lg p-8 rounded-xl bg-white border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Donation Details</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <motion.div variants={itemVariants} custom={3}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name (As on Pan Card)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Amount */}
                <motion.div variants={itemVariants} custom={4}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white text-gray-900"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </motion.div>

                {/* PAN Number */}
                <motion.div variants={itemVariants} custom={5}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pan Card Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="Pan Card Number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Transaction ID */}
                <motion.div variants={itemVariants} custom={6}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter transaction ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white text-gray-900"
                    required
                  />
                </motion.div>
                  {/* Transaction ID */}
                <motion.div variants={itemVariants} custom={6}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                  <input
                    type="file"
                    name="transactionScreenshot"
                    value={formData.transactionScreenshot}
                    onChange={handleChange}
                    placeholder="Enter transaction ID"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                  custom={7}
                  className={`relative w-full mt-6 py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 ${
                    submitted
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  {submitted ? "🎉 Donation Received!" : "💖 Confirm Donation"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 🌟 Glassmorphism Popup */}
      {/* 🌟 Popup Modal with Glassmorphism and Tick Animation */}
<AnimatePresence>
  {showPopup && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-white/10" // 👈 glass effect background
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ✅ Animated Tick */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* 🩵 Thank You Text */}
        <h3 className="text-2xl font-semibold text-green-800 mb-2 drop-shadow-md">
          Thank You!
        </h3>
        <p className="text-gray-700 font-medium">
          Your donation has been received successfully 🌟
        </p>

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="mt-5 px-5 py-2 bg-green-500/70 hover:bg-green-600/80 text-white font-medium rounded-lg backdrop-blur-md transition-all duration-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
