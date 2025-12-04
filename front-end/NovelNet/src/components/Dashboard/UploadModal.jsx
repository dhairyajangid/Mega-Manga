import { useState } from "react";
import axios from "axios";

export default function UploadModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState(null);

  const uploadNovel = async () => {
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("genre", genre);
      form.append("image", file);

      await axios.post("http://localhost:3000/api/v1/upload/novel", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Uploaded successfully!");
      onClose();
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-[430px]">
      
        <h2 className="text-xl font-semibold mb-6">Upload your work</h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-3 bg-[#111] border border-gray-700 rounded-lg outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Genre"
            className="p-3 bg-[#111] border border-gray-700 rounded-lg outline-none"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <input
            type="file"
            className="text-gray-300"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={uploadNovel}
            className="mt-3 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Upload
          </button>
        </div>

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
