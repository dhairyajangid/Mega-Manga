import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UploadModal from "../components/Dashboard/UploadModal";

export default function Dashboard() {
  const [open, setOpen] = useState(false); // popup toggle

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="pt-20 px-10">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Top tabs */}
        <div className="flex gap-6 text-gray-300 mb-10">
          <button className="px-5 py-2 rounded-full bg-[#222] text-white">
            Works
          </button>
          <button className="px-5 py-2 hover:text-white">Home</button>
          <button className="px-5 py-2 hover:text-white">Reactions</button>
          <button className="px-5 py-2 hover:text-white">Access analytics</button>
          <button className="px-5 py-2 hover:text-white">Ranking report</button>
        </div>

        {/* EMPTY STATE SECTION */}
        <div className="flex flex-col justify-center items-center mt-24 opacity-80">
          <img
            src="/icons/empty.svg"
            className="w-20 mb-4"
            alt="empty-icon"
          />

          <p className="text-lg mb-4">Try posting your work</p>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition"
          >
            Post your work
          </button>
        </div>
      </div>

      {/* POPUP FORM */}
      {open && <UploadModal onClose={() => setOpen(false)} />}
    </div>
  );
}
