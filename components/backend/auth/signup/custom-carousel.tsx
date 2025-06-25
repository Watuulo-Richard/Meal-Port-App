"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";

const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Premium Carriage Trucks",
    subtitle: "Reliable Transportation Solutions for Your Business",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Industry-Leading Quality",
    subtitle: "Built to Perform in Any Conditions",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Exceptional Customer Service",
    subtitle: "Dedicated Support Throughout Your Journey",
  },
];

export default function CustomCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-blue-900/70" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end p-6 text-white">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-red-400 text-4xl font-bold">SIN</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mx-1"
            >
              <path
                d="M16 3H1V16H16V3Z"
                fill="#f87171"
                fillOpacity="0.5"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8H20L23 12V16H16V8Z"
                fill="#f87171"
                fillOpacity="0.5"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="5.5"
                cy="18.5"
                r="2.5"
                fill="#60a5fa"
                stroke="#f87171"
                strokeWidth="1"
              />
              <circle
                cx="18.5"
                cy="18.5"
                r="2.5"
                fill="#60a5fa"
                stroke="#f87171"
                strokeWidth="1"
              />
            </svg>
            <span className="text-blue-400 text-4xl font-bold">RAY</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2">
          {carouselItems[currentSlide].title}
        </h2>
        <p className="text-xl mb-8">{carouselItems[currentSlide].subtitle}</p>

        {/* Contact details added here */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center mb-2">
            <Mail className="w-4 h-4 mr-2" />
            <span>info@sinoray.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span>+256762063160</span>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-red-400 w-8" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/75 hover:text-red-400 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/75 hover:text-blue-400 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

