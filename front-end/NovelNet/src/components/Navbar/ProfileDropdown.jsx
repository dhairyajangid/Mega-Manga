import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);

  return (
    <div className="absolute right-0 mt-2 w-64 bg-[#1A1A1A] text-white rounded-lg shadow-lg p-4 z-50">

      {/* USER INFO */}
      <div className="flex flex-col items-center border-b border-gray-700 pb-3 mb-3">
        <img
          src={user.avatar}
          className="w-12 h-12 rounded-full mb-2"
        />
        <h3 className="text-sm font-semibold">{user.username || "Guest"}</h3>
        <p className="text-xs text-gray-400">@{user.artistName || "artist"}</p>
      </div>

      {/* MENU ITEMS */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-left hover:text-blue-400"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/works")}
          className="text-left hover:text-blue-400"
        >
          My Works
        </button>

        <button
          onClick={() => navigate("/bookmarks")}
          className="text-left hover:text-blue-400"
        >
          Bookmarks
        </button>

        <button className="text-left hover:text-blue-400">
          Dark Theme
        </button>

        <button className="text-left text-red-400 mt-2">
          Logout
        </button>
      </div>

    </div>
  );
}
