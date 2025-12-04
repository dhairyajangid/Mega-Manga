// src/components/home/Carousel.jsx
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import novelsAtom from "../../atoms/novelsAtom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const novels = useRecoilValue(novelsAtom);
  const carouselNovels = novels.slice(0, 5);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % carouselNovels.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + carouselNovels.length) % carouselNovels.length);

  useEffect(() => {
    if (carouselNovels.length === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [carouselNovels.length]); // Fixed: Removed dependency issue

  if (carouselNovels.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {carouselNovels.map((novel, index) => (
        <div
          key={novel._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={novel.imageURL}
            alt={novel.novelName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-10">
            <div className="max-w-2xl">
              <h2 className="text-white text-5xl font-bold mb-4">{novel.novelName}</h2>
              <p className="text-gray-200 text-lg">{novel.synopsis}</p>
              
              {/* Add genres in carousel */}
              <div className="flex gap-2 mt-4">
                {novel.genre?.map((g, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800/80 text-white rounded-full text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition"
      >
        <ChevronLeft className="text-white w-7 h-7" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition"
      >
        <ChevronRight className="text-white w-7 h-7" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselNovels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition ${
              index === current ? 'bg-white w-8' : 'bg-gray-500 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;