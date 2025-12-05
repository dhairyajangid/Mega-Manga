import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import { getUserData } from "../../services/authAPI";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const navigate = useNavigate();
  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = getUserData();
    if (userData.username) {
      setUser(userData);
    }
  }, [setUser]);

  return (
    <nav className="w-full h-16 bg-[#111] text-white flex items-center px-6 justify-between shadow-md">

      {/* LEFT LOGO */}
      <div className="text-2xl font-bold cursor-pointer">
        <button onClick={()=> navigate('/')}>
          NovelNet
        </button>
      </div>

      {/* CENTER SEARCH */}
      <div className="w-[40%]">
        <SearchBar />
      </div>

      {/* RIGHT NAV ITEMS */}
      <div className="flex items-center gap-6">

        <button className="px-4 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition">
          Post
        </button>

        <i className="ri-mail-line text-xl cursor-pointer"></i>
        <i className="ri-notification-3-line text-xl cursor-pointer"></i>

        {/* PROFILE */}
        <div className="relative">
          <img
            src={user.avatar || "/default-avatar.png"}
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-700"
            onClick={() => setOpen(!open)}
            alt="profile"
          />

          {open && <ProfileDropdown onClose={() => setOpen(false)} />}
        </div>
      </div>
    </nav>
  );
}