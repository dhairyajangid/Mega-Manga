import { useState } from "react";
import axios from "axios";

export default function UploadModal({ onClose }) {
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
    "Thriller", "Adventure", "Drama", "Comedy", "Historical"
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
      
      // Append each genre separately
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
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto py-8">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[550px] max-h-[90vh] overflow-y-auto">
        
        <h2 className="text-xl font-semibold mb-6">Upload Your Novel</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          
          {/* Novel Name */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Novel Name *</label>
            <input
              type="text"
              name="novelName"
              placeholder="Enter novel title"
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition"
              value={formData.novelName}
              onChange={handleChange}
            />
          </div>

          {/* Synopsis */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Synopsis *</label>
            <textarea
              name="synopsis"
              placeholder="Brief description of your novel..."
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition h-24 resize-none"
              value={formData.synopsis}
              onChange={handleChange}
            />
          </div>

          {/* Artist/Author */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Artist/Author *</label>
            <input
              type="text"
              name="artist"
              placeholder="Your name or pen name"
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition"
              value={formData.artist}
              onChange={handleChange}
            />
          </div>

          {/* Novel Type */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Type</label>
            <select
              name="novelType"
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition"
              value={formData.novelType}
              onChange={handleChange}
            >
              <option value="Novel">Novel</option>
              <option value="Manga">Manga</option>
              <option value="Light Novel">Light Novel</option>
              <option value="Web Novel">Web Novel</option>
            </select>
          </div>

          {/* Genre Selection */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Genre * (Select multiple)</label>
            <div className="flex flex-wrap gap-2">
              {genreOptions.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenreToggle(g)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    formData.genre.includes(g)
                      ? "bg-blue-600 text-white"
                      : "bg-[#111] text-gray-400 hover:bg-[#222]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Initial Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              placeholder="0"
              min="0"
              max="10"
              step="0.1"
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Release Date (Optional)</label>
            <input
              type="date"
              name="releaseDate"
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Cover Image *</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={uploadNovel}
            disabled={loading}
            className="mt-3 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Uploading..." : "Upload Novel"}
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-4 text-gray-400 text-sm underline hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}