import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  // SEARCH API CALL
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost/api/v1/novel/bulk?filter=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }

      setShow(true);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShow(true)}
        placeholder="Search novels, manga..."
        className="w-full px-4 py-2 bg-[#222] text-white rounded-md outline-none"
      />

      {show && results.length > 0 && (
        <SearchResults results={results} setShow={setShow} />
      )}
    </div>
  );
}
