import React from "react";

const TrendingSidebar = ({ trending }) => {
  return (
    <div className="w-80 sticky top-4 bg-gray-900 p-6 rounded-xl h-fit">
      <h2 className="text-white text-xl font-bold mb-4">🔥 Trending</h2>

      <div className="space-y-3">
        {trending.slice(0, 10).map((novel, index) => (
          <div
            key={novel._id}
            className="flex gap-3 items-start p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <span className="text-gray-500 text-xl w-6">{index + 1}</span>
            <img
              src={novel.imageURL}
              className="w-16 h-20 rounded object-cover"
            />
            <h4 className="text-white line-clamp-2">{novel.novelName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;
