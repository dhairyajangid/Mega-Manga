import { useNavigate } from "react-router-dom";

export default function SearchResults({ results, setShow }) {
  const navigate = useNavigate();

  return (
    <div className="absolute w-full bg-[#1A1A1A] rounded-md shadow-lg mt-2 max-h-64 overflow-y-auto z-50">

      {results.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#333]"
          onClick={() => {
            navigate(`/novel/${item._id}`);
            setShow(false);
          }}
        >
          <img src={item.imageURL} className="w-12 h-12 rounded-md" />

          <div>
            <h3 className="text-white text-sm">{item.novelName}</h3>
            <p className="text-gray-400 text-xs">Rating: {item.rating}</p>
          </div>
        </div>
      ))}

      {results.length === 0 && (
        <p className="text-gray-400 p-3 text-sm">No results found</p>
      )}
    </div>
  );
}
