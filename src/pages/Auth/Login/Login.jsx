// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInFunc, signInWithPopupGoogleFunc, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveUserToDB = async (loggedInUser, idToken) => {
    try {
      const res = await axiosSecure.post(
        "/users",
        {
          email: loggedInUser.email,
          name: loggedInUser.displayName || "Anonymous",
          photoURL: loggedInUser.photoURL || "",
        },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      // 👍 এটাই success (এখানে কোনো error toast লাগবে না)
      console.log("User save result:", res.data);
    } catch (err) {
      const msg = err.response?.data?.message;
      console.log("User save error:", msg);

      // User already exists → এটা error না
      if (msg === "User already exists") {
        return;
      }

      toast.error(msg || "Something went wrong when saving user!");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const res = await signInFunc(email, password);
      const loggedInUser = res.user;

      const idToken = await loggedInUser.getIdToken();

      await saveUserToDB(loggedInUser, idToken);

      setUser(loggedInUser);
      toast.success("Login successful!");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopupGoogleFunc();
      const loggedInUser = res.user;

      const idToken = await loggedInUser.getIdToken();

      await saveUserToDB(loggedInUser, idToken);

      setUser(loggedInUser);
      toast.success("Google login successful!");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        {/* Email */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-4 top-3 cursor-pointer"
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="flex items-center justify-center space-x-2 mt-2">
          <span className="h-px bg-gray-300 flex-1"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="h-px bg-gray-300 flex-1"></span>
        </div>

        {/* Google login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
