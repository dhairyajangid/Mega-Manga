import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import { signupAPI } from "../../services/authAPI";

const SignupForm = ({ switchToSignin }) => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstname || !form.lastname || !form.username || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await signupAPI(form);
    
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
      className="relative z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-[440px] shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn custom-scrollbar"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl -z-10"></div>
      
      <div className="text-center mb-6">
        <h2 className="text-white text-4xl font-bold mb-2 tracking-tight">Create Account</h2>
        <p className="text-gray-300 text-sm">Join NovelNet community today</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-5 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-white rounded-xl text-sm text-center animate-shake">
          <i className="ri-error-warning-line mr-2"></i>
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group">
            <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-purple-400 transition-colors"></i>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 text-sm"
              disabled={loading}
            />
          </div>

          <div className="relative group">
            <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-purple-400 transition-colors"></i>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 text-sm"
              disabled={loading}
            />
          </div>
        </div>

        <div className="relative group">
          <i className="ri-at-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors"></i>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300"
            disabled={loading}
          />
        </div>

        <div className="relative group">
          <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors"></i>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300"
            disabled={loading}
          />
        </div>

        <div className="relative group">
          <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors"></i>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password (min 6 characters)"
            className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-xl outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300"
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/30"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <i className="ri-loader-4-line animate-spin mr-2"></i>
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="mt-5 text-center">
        <p className="text-gray-300 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={!loading ? switchToSignin : undefined}
            className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors"
            disabled={loading}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;