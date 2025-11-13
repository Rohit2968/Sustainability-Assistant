import React, { useState, useEffect } from "react";
import { MessageCircle, Leaf, Lightbulb, Recycle } from "lucide-react";
import SustainabilityFAQ from "./SustainabilityFAQ";
import CarbonGraph from "./CarbonGraph";

export default function HomePage({ onStartChat }) {
  const words = [
    "Sustainable Living 🌱",
    "Green Energy Solutions ☀️",
    "Smart Waste Management ♻️",
    "Climate Action Guidance 🌍",
    "Eco-Friendly Lifestyle Tips 💡",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-full">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Smart Sustainability Assistant
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          {/* Main Title */}
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI-Powered
            <span className="text-green-600 block">Sustainability Guide</span>
          </h2>

          {/* Rotating Animated Text */}
          <div className="text-2xl font-semibold text-green-600 h-10 flex justify-center items-center">
            <span className="animate-fade">{words[index]}</span>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mt-6">
            Get instant, expert advice on sustainable living, eco-friendly
            solutions, and environmental practices. Make informed decisions for
            a greener future.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 
                          transition-all duration-300 transform hover:scale-125 hover:shadow-2xl"
          >
            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
              <Lightbulb className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Smart Solutions
            </h3>
            <p className="text-gray-600">
              Discover innovative eco-friendly alternatives for your daily life
              and business needs.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100
                          transition-all duration-300 transform hover:scale-125 hover:shadow-2xl"
          >
            <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Waste Reduction
            </h3>
            <p className="text-gray-600">
              Learn practical strategies to reduce, reuse, and recycle in your
              community.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-2xl shadow-sm border border-teal-100
                          transition-all duration-300 transform hover:scale-125 hover:shadow-2xl"
          >
            <div className="bg-teal-100 p-3 rounded-full w-fit mb-4">
              <Leaf className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Green Living
            </h3>
            <p className="text-gray-600">
              Get personalized recommendations for sustainable lifestyle
              changes.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <SustainabilityFAQ />
        </div>

        <div className="mt-17 mb-20">
          <CarbonGraph />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={onStartChat}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 
                       text-white px-8 py-4 rounded-2xl text-lg font-semibold
                       transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Start Chatting
          </button>
          <p className="text-sm text-gray-500 mt-4">
            No signup required • Instant responses • Expert advice
          </p>
        </div>
      </main>
    </div>
  );
}
