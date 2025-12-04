import React from "react";
import { Star } from "lucide-react";

const SmallNovelCard = ({ novel }) => {
  return (
    <div className="w-48 flex-shrink-0 cursor-pointer group">
      <div className="relative h-72 rounded-lg overflow-hidden">
        <img
          src={novel.imageURL}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm">{novel.rating}</span>
        </div>
      </div>

      <h3 className="text-white text-sm mt-2 line-clamp-2">{novel.novelName}</h3>
    </div>
  );
};

export default SmallNovelCard;
