import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UploadForm from "../components/Dashboard/UploadModal";

export default function Dashboard() {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="pt-20 px-10">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Top tabs */}
        <div className="flex gap-6 text-gray-300 mb-10">
          <button className="px-5 py-2 rounded-full bg-[#222] text-white">
            Home
          </button>
          <button className="px-5 py-2 hover:text-white">Works</button>
          <button className="px-5 py-2 hover:text-white">Reactions</button>
          <button className="px-5 py-2 hover:text-white flex items-center gap-2">
            Access analytics
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">P</span>
          </button>
          <button className="px-5 py-2 hover:text-white flex items-center gap-2">
            Ranking report
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">P</span>
          </button>
        </div>

        {/* CONTENT AREA */}
        {!showUploadForm ? (
          // EMPTY STATE SECTION
          <div className="bg-[#1e1e1e] rounded-2xl p-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Recently uploaded works</h2>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <button className="text-gray-400 hover:text-white transition">View all</button>
            </div>

            <div className="flex flex-col items-center justify-center py-20">
              <img
                src="https://ik.imagekit.io/Tenkai123/authBackground/Screenshot%202025-12-05%20202556.png"
                className="w-20 mb-6 opacity-60"
                alt="empty-icon"
              />
              <p className="text-gray-400 text-lg mb-6">Try posting your work</p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="px-8 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-full transition font-medium"
              >
                Post your work
              </button>
            </div>
          </div>
        ) : (
          // UPLOAD FORM
          <UploadForm onCancel={() => setShowUploadForm(false)} />
        )}
      </div>
    </div>
  );
}