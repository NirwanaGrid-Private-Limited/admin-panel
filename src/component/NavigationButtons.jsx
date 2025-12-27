import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationButtons({ currentSlide, setCurrentSlide, totalSlides }) {
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={goToPrevious}
        className="w-12 h-12 border border-slate-600 hover:border-slate-400 transition-colors flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      </button>
      
      <button
        onClick={goToNext}
        className="w-12 h-12 border border-slate-600 hover:border-slate-400 transition-colors flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
}
