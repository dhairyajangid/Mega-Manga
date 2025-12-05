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
      setUser({
        username: result.data.username,
        artistName: result.data.artistName,
        avatar: result.data.avatar
      });
      
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-[440px] shadow-2xl animate-fadeIn"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-white text-4xl font-bold mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-gray-300 text-sm">Sign in to continue your journey</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-5 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-white rounded-xl text-sm text-center animate-shake">
          <i className="ri-error-warning-line mr-2"></i>
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative group">
          <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors"></i>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300"
            disabled={loading}
          />
        </div>

        <div className="relative group">
          <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors"></i>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300"
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/30"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <i className="ri-loader-4-line animate-spin mr-2"></i>
            Signing In...
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="mt-6 text-center">
        <p className="text-gray-300 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={!loading ? switchToSignup : undefined}
            className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors"
            disabled={loading}
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
};

export default SigninForm;