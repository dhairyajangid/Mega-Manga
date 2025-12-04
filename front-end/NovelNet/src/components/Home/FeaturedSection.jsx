import React, { useRef } from "react";
import { useRecoilValue } from "recoil";
import novelsAtom from "../../atoms/novelsAtom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmallNovelCard from "../cards/SmallNovelCard";

const FeaturedSection = () => {
  const novels = useRecoilValue(novelsAtom);
  const scrollRef = useRef(null);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="py-8 bg-black">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl text-white font-bold">Featured Novels</h2>
          <div className="flex gap-2">
            <button onClick={scrollLeft} className="bg-gray-800 p-2 rounded-full">
              <ChevronLeft className="text-white" />
            </button>
            <button onClick={scrollRight} className="bg-gray-800 p-2 rounded-full">
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
          {novels.slice(0, 15).map((novel) => (
            <SmallNovelCard key={novel._id} novel={novel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
