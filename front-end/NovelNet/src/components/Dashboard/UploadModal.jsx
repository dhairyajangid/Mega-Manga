import { useState } from "react";
import axios from "axios";

export default function UploadForm({ onCancel }) {
  const [formData, setFormData] = useState({
    novelName: "",
    synopsis: "",
    novelType: "Novel",
    artist: "",
    genre: [],
    rating: "",
    releaseDate: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genreOptions = [
    "Fantasy", "Romance", "Mystery", "Sci-Fi", "Horror", 
    "Thriller", "Adventure", "Drama", "Comedy", "Historical","Action"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (selectedGenre) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(selectedGenre)
        ? prev.genre.filter(g => g !== selectedGenre)
        : [...prev.genre, selectedGenre]
    }));
  };

  const uploadNovel = async () => {
    try {
      setError("");
      setLoading(true);

      // Validation
      if (!formData.novelName || !formData.synopsis || !formData.artist || !file) {
        setError("Please fill all required fields and upload an image");
        setLoading(false);
        return;
      }

      if (formData.genre.length === 0) {
        setError("Please select at least one genre");
        setLoading(false);
        return;
      }

      // Create FormData
      const form = new FormData();
      form.append("novelName", formData.novelName);
      form.append("synopsis", formData.synopsis);
      form.append("novelType", formData.novelType);
      form.append("artist", formData.artist);
      
      formData.genre.forEach(g => form.append("genre", g));
      
      form.append("rating", formData.rating || "0");
      if (formData.releaseDate) {
        form.append("releaseDate", formData.releaseDate);
      }
      form.append("image", file);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/v1/upload/novel", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });

      alert("Novel uploaded successfully!");
      
      // Reset form
      setFormData({
        novelName: "",
        synopsis: "",
        novelType: "Novel",
        artist: "",
        genre: [],
        rating: "",
        releaseDate: ""
      });
      setFile(null);
      onCancel(); // Go back to empty state
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Upload Your Novel</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition text-2xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Upload Button at Top */}
      <div className="mb-8 text-center">
        <div className="inline-block">
          <label className="cursor-pointer">
            <div className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">Add Images</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <p className="text-gray-400 text-sm mt-3">JPEG / GIF / PNG</p>
          <p className="text-gray-500 text-xs mt-1">
            You can upload up to 32 MB per file and a maximum of 200 files
          </p>
          <p className="text-gray-500 text-xs">(the total file size must be less than 200 MB)</p>
        </div>
        
        {file && (
          <div className="mt-4 text-green-400 text-sm">
            ✓ {file.name} selected
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="bg-[#2a2a2a] rounded-lg p-4">
          <input
            type="text"
            name="novelName"
            placeholder="Title"
            className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            value={formData.novelName}
            onChange={handleChange}
            maxLength={32}
          />
          <div className="text-right text-gray-500 text-sm mt-2">
            {formData.novelName.length}/32
          </div>
        </div>

        {/* Synopsis/Caption */}
        <div className="bg-[#2a2a2a] rounded-lg p-4">
          <textarea
            name="synopsis"
            placeholder="Caption"
            className="w-full bg-transparent outline-none text-white placeholder-gray-500 resize-none"
            rows="6"
            value={formData.synopsis}
            onChange={handleChange}
            maxLength={3000}
          />
          <div className="text-right text-gray-500 text-sm mt-2">
            {formData.synopsis.length}/3000
          </div>
        </div>

        {/* Tags/Genre - Required */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Required</span>
            <label className="text-gray-400">Tags (Genre)</label>
          </div>
          <div className="bg-[#2a2a2a] rounded-lg p-4">
            <input
              type="text"
              placeholder="Tags"
              className="w-full bg-transparent outline-none text-white placeholder-gray-500 mb-2"
              readOnly
              value={formData.genre.join(", ")}
            />
            <div className="text-right text-gray-500 text-sm mb-4">
              {formData.genre.length}/10
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <p className="text-red-500 text-sm mb-3">Recommended tags</p>
              <div className="flex flex-wrap gap-2">
                {genreOptions.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGenreToggle(g)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      formData.genre.includes(g)
                        ? "bg-blue-600 text-white"
                        : "bg-[#1e1e1e] text-gray-300 hover:bg-[#333]"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fields in Two Columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Artist/Author */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Artist/Author *</label>
            <input
              type="text"
              name="artist"
              placeholder="Your name"
              className="w-full p-3 bg-[#2a2a2a] rounded-lg outline-none text-white placeholder-gray-500"
              value={formData.artist}
              onChange={handleChange}
            />
          </div>

          {/* Novel Type */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Type</label>
            <select
              name="novelType"
              className="w-full p-3 bg-[#2a2a2a] rounded-lg outline-none text-white"
              value={formData.novelType}
              onChange={handleChange}
            >
              <option value="Novel">Novel</option>
              <option value="Manga">Manga</option>
              <option value="Light Novel">Light Novel</option>
              <option value="Web Novel">Web Novel</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Initial Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              placeholder="0"
              min="0"
              max="10"
              step="0.1"
              className="w-full p-3 bg-[#2a2a2a] rounded-lg outline-none text-white placeholder-gray-500"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Release Date (Optional)</label>
            <input
              type="date"
              name="releaseDate"
              className="w-full p-3 bg-[#2a2a2a] rounded-lg outline-none text-white"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-8 py-3 bg-[#2a2a2a] hover:bg-[#333] rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={uploadNovel}
            disabled={loading}
            className="px-12 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Uploading..." : "Upload Novel"}
          </button>
        </div>
      </div>
    </div>
  );
}