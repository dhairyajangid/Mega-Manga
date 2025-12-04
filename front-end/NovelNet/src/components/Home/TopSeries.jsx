import React from "react";
import { Star } from "lucide-react";

const TopSeries = ({ trending }) => {
  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-white text-3xl font-bold mb-6">⭐ Top Series</h2>

        <div className="grid grid-cols-5 gap-6">
          {trending.slice(0, 10).map((novel, index) => (
            <div key={novel._id} className="group cursor-pointer">
              <div className="relative h-72 rounded-lg overflow-hidden">
                <img
                  src={novel.imageURL}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-black w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex gap-1">
                  <Star className="text-yellow-400 w-4 h-4" />
                  <span className="text-white">{novel.rating}</span>
                </div>
              </div>

              <h3 className="text-white mt-2 line-clamp-2 group-hover:text-blue-400">
                {novel.novelName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSeries;
