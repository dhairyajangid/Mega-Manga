import React from "react";
import { useRecoilValue } from "recoil";
import novelsAtom from "../../atoms/novelsAtom";
import NovelCard from "../cards/NovelCard";

const NovelGrid = () => {
  const novels = useRecoilValue(novelsAtom);

  return (
    <div className="flex-1">
      <h2 className="text-2xl text-white font-bold mb-6">All Novels</h2>

      <div className="grid grid-cols-3 gap-6">
        {novels.map((novel) => (
          <NovelCard key={novel._id} novel={novel} />
        ))}
      </div>
    </div>
  );
};

export default NovelGrid;
