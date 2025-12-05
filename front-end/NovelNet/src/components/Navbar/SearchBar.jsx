import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShow(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/novel/bulk?filter=${query}`
        );
        const data = await res.json();

        setResults(data);
        setShow(data.length > 0); // only show if results exist
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShow(true)}
        placeholder="Search novels, manga..."
        className="w-full px-4 py-2 bg-[#222] text-white rounded-md outline-none"
      />

      {show && results.length > 0 && (
        <SearchResults results={results} setShow={setShow} />
      )}
    </div>
  );
}
