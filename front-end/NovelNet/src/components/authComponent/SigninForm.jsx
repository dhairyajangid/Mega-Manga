import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import { loginAPI } from "../../services/authAPI";

const SigninForm = ({ switchToSignup }) => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    const result = await loginAPI(form);
    
    setLoading(false);

    if (result.success) {
      // Update Recoil state with user data from backend
      setUser({
        username: result.data.username,
        artistName: result.data.artistName,
        avatar: result.data.avatar
      });
      
      // Redirect to home page
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-xl w-96 shadow-2xl"
    >
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Sign In</h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/90 text-white rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 mb-4 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-3 mb-4 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p
        onClick={!loading ? switchToSignup : undefined}
        className={`text-white mt-4 text-sm text-center ${
          loading ? "opacity-50" : "cursor-pointer hover:underline"
        }`}
      >
        Don't have an account? <span className="font-semibold">Sign Up</span>
      </p>
    </form>
  );
};

export default SigninForm;