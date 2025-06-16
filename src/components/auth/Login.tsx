import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.signedUp) {
      setToastMessage(
        "Account created! Please check your email to confirm your address."
      );
    }

    // Clear the state to avoid showing the toast again
    window.history.replaceState({}, document.title);
  }, [location.state]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);

      if (error.message.toLowerCase().includes("email not confirmed")) {
        setShowResend(true); // trigger the resend button
      }
    } else {
      navigate("/dashboard");
    }
  };

  const handleResend = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) {
      setError("Failed to resend confirmation: " + error.message);
    } else {
      setShowResend(false);
      setError(null);
      setEmail("");
      setPassword("");
      setToastMessage("Resend confirmation has been sent to your email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-200 text-green-800 px-6 py-3 rounded shadow z-50 w-full max-w-xl text-center">
          {toastMessage}
        </div>
      )}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Log In
        </button>

        <p className="text-indigo-700 text-sm mb-3 mt-4">
          <Link
            to="/signup"
            className="block text-center text-indigo-700 text-sm mt-4 hover:underline"
          >
            New user? Click here to register
          </Link>
        </p>

        {showResend && (
          <button
            onClick={handleResend}
            className="w-full bg-red-600 text-white py-2 mt-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Resend confirmation email
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
