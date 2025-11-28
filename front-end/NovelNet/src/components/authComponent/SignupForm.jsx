import { useState } from "react";
import { signupAPI } from "../../services/authAPI";

const SignupForm = ({ switchToSignin }) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupAPI(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 bg-white/20 backdrop-blur-md p-6 rounded-xl w-80"
    >
      <h2 className="text-white text-2xl font-bold mb-4">Sign Up</h2>

      <input
        name="firstname"
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 mb-2 rounded"
      />

      <input
        name="lastname"
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 mb-2 rounded"
      />

      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        className="w-full p-2 mb-2 rounded"
      />

      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 mb-2 rounded"
      />

      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-2 mb-3 rounded"
      />

      <button className="w-full bg-black text-white p-2 rounded">
        Sign Up
      </button>

      <p
        onClick={switchToSignin}
        className="text-white mt-3 text-sm cursor-pointer underline text-center"
      >
        Already have an account?
      </p>
    </form>
  );
};

export default SignupForm;
