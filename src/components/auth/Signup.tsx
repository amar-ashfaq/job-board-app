import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match - Please try again.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSignup}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          Create an account
        </h2>

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 text-left"
            htmlFor="title"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="joe.bloggs@gmail.com"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            className="block mb-1 font-medium text-gray-700 text-left"
            htmlFor="title"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            className="block mb-1 font-medium text-gray-700 text-left"
            htmlFor="title"
          >
            Confirm password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default Signup;
