// src/components/cards/NovelCard.jsx
import React from "react";
import { Star } from "lucide-react";

const NovelCard = ({ novel }) => {
  return (
    <div className="cursor-pointer group">
      <div className="relative rounded-lg overflow-hidden h-80">
        <img
          src={novel.imageURL}
          alt={novel.novelName}
          className="w-full h-full object-cover transition group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/70 px-3 py-1.5 rounded-md flex gap-1">
          <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
          <span className="text-white font-bold">{novel.rating}</span>
        </div>
      </div>

      <h3 className="text-white mt-2 font-semibold line-clamp-2 group-hover:text-blue-400 transition">
        {novel.novelName}
      </h3>
      
      {/* Add genres */}
      <div className="flex flex-wrap gap-1 mt-2">
        {novel.genre?.map((g, i) => (
          <span key={i} className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
            {g}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NovelCard;