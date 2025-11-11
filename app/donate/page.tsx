"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Heart, QrCode, CheckCircle2, X } from "lucide-react";
import CustomButton from "@/components/custom/custom-button";
import Footer from "@/components/custom/footer-section";

export default function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    panNumber: "",
    transactionId: "",
    transactionScreenshot: null as File | null,
  });
  const [showQR, setShowQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        transactionScreenshot: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.amount &&
      formData.panNumber &&
      formData.transactionId &&
      formData.transactionScreenshot
    ) {
      setSubmitted(true);
      setShowPopup(true);

      // Reset after delay
      setTimeout(() => {
        setFormData({
          name: "",
          amount: "",
          panNumber: "",
          transactionId: "",
          transactionScreenshot: null,
        });
        setSubmitted(false);
      }, 3000);

      // Auto-close popup
      setTimeout(() => setShowPopup(false), 4000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <>
    <section className="relative min-h-screen py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full mb-6">
            <Heart className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              Support Our Cause
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Make a Donation
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your contribution helps us create positive change. Choose your
            preferred payment method and contribute today.
          </p>
        </motion.div>

        {/* Payment Container */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* QR Section */}
          <motion.div
            className="flex flex-col"
            variants={itemVariants}
            custom={1}
          >
            <div className="bg-white shadow-2xl p-8 rounded-2xl border-2 border-orange-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Scan to Donate
                </h3>
              </div>

              <motion.div
                className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl flex items-center justify-center mb-6 border-2 border-dashed border-orange-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {showQR ? (
                  <img
                    src={"/placeholder.svg"}
                    alt="Donation QR Code"
                    className="w-64 h-64 rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center shadow-inner">
                      <div className="text-center">
                        <QrCode className="w-24 h-24 text-orange-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">
                          Click below to reveal QR
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              <CustomButton
                onClick={() => setShowQR(!showQR)}
                className="w-full py-4 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                {showQR ? "Hide QR Code" : "Show QR Code"}
              </CustomButton>

              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-sm text-gray-700 text-center font-medium">
                  🔒 Secure payment • Scan with any UPI app
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Accepted Payment Methods:
                </p>
                <div className="flex flex-wrap gap-3">
                  {["GPay", "PhonePe", "Paytm", "UPI"].map((method) => (
                    <span
                      key={method}
                      className="px-3 py-1 bg-white border-2 border-orange-200 rounded-full text-xs font-medium text-gray-700"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="flex flex-col"
            variants={itemVariants}
            custom={2}
          >
            <div className="bg-white shadow-2xl p-8 rounded-2xl border-2 border-orange-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Donation Details
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <motion.div variants={itemVariants} custom={3}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name (As on PAN Card)"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all"
                    required
                  />
                </motion.div>

                {/* Amount */}
                <motion.div variants={itemVariants} custom={4}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Donation Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-orange-600 font-bold text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </motion.div>

                {/* PAN Number */}
                <motion.div variants={itemVariants} custom={5}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 uppercase transition-all"
                    maxLength={10}
                    required
                  />
                </motion.div>

                {/* Transaction ID */}
                <motion.div variants={itemVariants} custom={6}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter UPI transaction ID"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all"
                    required
                  />
                </motion.div>

                {/* Transaction Screenshot */}
                <motion.div variants={itemVariants} custom={7}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction Proof
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="transactionScreenshot"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                      required
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full px-4 py-3 border-2 border-dashed border-orange-200 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <Upload className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700 font-medium">
                        {formData.transactionScreenshot
                          ? formData.transactionScreenshot.name
                          : "Upload Screenshot"}
                      </span>
                    </label>
                  </div>
                  {formData.transactionScreenshot && (
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      File uploaded successfully
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                  custom={8}
                  className={`relative w-full mt-6 py-4 px-6 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl ${
                    submitted
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      Donation Received!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      Confirm Donation
                    </span>
                  )}
                </motion.button>
              </form>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                <p className="text-xs text-gray-700 text-center font-medium">
                  🛡️ Your information is secure and encrypted
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              className="relative bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full border-4 border-orange-200"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                  Thank You!
                </h3>
                <p className="text-gray-700 font-medium text-lg mb-2">
                  Your generous donation has been received successfully
                </p>
                <p className="text-gray-600 text-sm">
                  You're making a real difference! 🌟
                </p>
              </motion.div>

              {/* Confetti Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                    initial={{
                      x: "50%",
                      y: "50%",
                      scale: 0,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: Math.random() * 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowPopup(false)}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    <Footer />
    </>
  );
}