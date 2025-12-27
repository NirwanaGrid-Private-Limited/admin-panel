import React from 'react';

export default function SliderProgress({ currentSlide, setCurrentSlide, totalSlides }) {
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className="h-1 transition-all duration-300 ease-out rounded-full"
          style={{
            width: index === currentSlide ? '32px' : '8px',
            backgroundColor: index === currentSlide ? '#A5FF46' : 'rgba(255, 255, 255, 0.3)',
          }}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );
}
