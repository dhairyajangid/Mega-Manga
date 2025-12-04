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
      // ✅ Update Recoil state with user data from backend
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
      className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-xl w-96 shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Sign Up</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/90 text-white rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <input
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-3 mb-3 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <input
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-3 mb-3 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full p-3 mb-3 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 mb-3 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password (min 6 characters)"
        className="w-full p-3 mb-4 rounded-lg outline-none text-gray-800"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p
        onClick={!loading ? switchToSignin : undefined}
        className={`text-white mt-4 text-sm text-center ${
          loading ? "opacity-50" : "cursor-pointer hover:underline"
        }`}
      >
        Already have an account? <span className="font-semibold">Sign In</span>
      </p>
    </form>
  );
};

export default SignupForm;