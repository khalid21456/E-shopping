import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Gift, Zap, Calendar } from 'lucide-react';

const Carousel = () => {
  const [currentPub, setCurrentPub] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const pubs = [
    {
      name: "e-shop",
      festival: "FESTIVAL",
      title: "Rendez-vous",
      subtitle: "le 8 septembre",
      discount: "-70%",
      discountText: "JUSQU'À",
      buttonText: "Découvrir",
      bgGradient: "from-orange-400 via-orange-500 to-red-500",
      accentColor: "bg-yellow-400",
      decorativeIcons: ["🎁", "⚡", "🎯", "💫"]
    },
    {
      name: "MEGA",
      festival: "SALE",
      title: "Super Deals",
      subtitle: "this weekend",
      discount: "-80%",
      discountText: "UP TO",
      buttonText: "Shop Now",
      bgGradient: "from-purple-400 via-pink-500 to-red-500",
      accentColor: "bg-cyan-400",
      decorativeIcons: ["🛍️", "💎", "🚀", "✨"]
    },
    {
      name: "FLASH",
      festival: "DEALS",
      title: "Limited Time",
      subtitle: "24h only",
      discount: "-60%",
      discountText: "SAVE",
      buttonText: "Get Deals",
      bgGradient: "from-cyan-400 via-blue-500 to-purple-600",
      accentColor: "bg-orange-400",
      decorativeIcons: ["⏰", "🔥", "💥", "🎊"]
    }
  ];

  const switchPub = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPub((prev) => (prev + 1) % pubs.length);
      } else {
        setCurrentPub((prev) => (prev - 1 + pubs.length) % pubs.length);
      }
      setIsAnimating(false);
    }, 150);
  };

  const pub = pubs[currentPub];

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] rounded overflow-hidden shadow-2xl">
      {/* Main Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${pub.bgGradient} transition-all duration-500`}>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="geometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <polygon points="10,1 19,7 19,13 10,19 1,13 1,7" fill="white" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric)" />
          </svg>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {pub.decorativeIcons.map((icon, index) => (
            <div
              key={`${currentPub}-${index}`}
              className={`absolute text-2xl animate-pulse`}
              style={{
                top: `${20 + (index * 15)}%`,
                right: `${10 + (index * 8)}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: '2s'
              }}
            >
              <div className={`${pub.accentColor} rounded-full p-2 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300`}>
                <span className="text-white font-bold text-sm">{icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => switchPub('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={() => switchPub('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Main Content */}
        <div className={`flex items-center justify-between h-full p-8 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            {/* Brand Name */}
            <div className="flex items-center space-x-2">
              <h1 className="text-5xl font-black text-white tracking-wider">
                {pub.name}
              </h1>
              <Star className="w-8 h-8 text-yellow-300 fill-current" />
            </div>
            
            {/* Festival Text */}
            <div className="transform -skew-x-12">
              <h2 className="text-4xl font-black text-yellow-300 tracking-widest italic">
                {pub.festival}
              </h2>
            </div>

            {/* Event Details */}
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white">
                {pub.title}
              </h3>
              <p className="text-2xl text-white/90 font-medium">
                {pub.subtitle}
              </p>
            </div>

            {/* Discount Badge */}
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full px-6 py-3 shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-bold text-sm">
                    {pub.discountText}
                  </span>
                  <span className="text-3xl font-black text-gray-800">
                    {pub.discount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - People Images Placeholder */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              {/* Person 1 */}
              <div className="w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm border-4 border-white/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
              </div>
              
              {/* Person 2 */}
              <div className="absolute -right-16 top-8 w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm border-4 border-white/30 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-8 right-8">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
              <span className="text-lg">{pub.buttonText}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {pubs.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentPub) {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentPub(index);
                    setIsAnimating(false);
                  }, 150);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPub 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-4 left-4 animate-bounce">
          <div className={`${pub.accentColor} rounded-lg p-2 transform rotate-12`}>
            <Gift className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute top-8 right-1/3 animate-pulse">
          <div className={`${pub.accentColor} rounded-full p-2 transform -rotate-12`}>
            <Zap className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="absolute bottom-16 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className={`${pub.accentColor} rounded-lg p-2 transform rotate-45`}>
            <Calendar className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;