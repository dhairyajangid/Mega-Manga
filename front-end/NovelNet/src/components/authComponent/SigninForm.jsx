import { useState } from "react";
import { loginAPI } from "../../services/authAPI";

const SigninForm = ({ switchToSignup }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAPI(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 bg-white/20 backdrop-blur-md p-6 rounded-xl w-80"
    >
      <h2 className="text-white text-2xl font-bold mb-4">Sign In</h2>

      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 mb-3 rounded"
      />

      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-2 mb-3 rounded"
      />

      <button className="w-full bg-black text-white p-2 rounded">
        Sign In
      </button>

      <p
        onClick={switchToSignup}
        className="text-white mt-3 text-sm cursor-pointer underline text-center"
      >
        Create an account
      </p>
    </form>
  );
};

export default SigninForm;
