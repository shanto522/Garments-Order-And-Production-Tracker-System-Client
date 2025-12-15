// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Register = () => {
  const { signUpFunc, setUser, signInWithPopupGoogleFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password, photo, role } = data;

      // 1️⃣ Image upload to IMGBB
      let photoURL = "";
      if (photo && photo[0]) {
        const formData = new FormData();
        formData.append("image", photo[0]);
        const imgbbAPI = import.meta.env.VITE_IMAGE_HOST;
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
          { method: "POST", body: formData }
        );
        const imgData = await res.json();
        if (imgData.success) photoURL = imgData.data.url;
        else toast.error("Image upload failed");
      }

      // 2️⃣ Create user in Firebase
      const userCredential = await signUpFunc(email, password);
      const user = userCredential.user;
      setUser(user);

      // 3️⃣ Get Firebase token
      const idToken = await user.getIdToken();

      // 4️⃣ Save user to backend with role & status pending
      await axiosSecure.post(
        "/users",
        {
          name,
          email,
          photoURL,
          role, // buyer/manager from dropdown
          status: "pending",
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      toast.success("Registration successful!");
      navigate(from, { replace: true }); // আগের page এ redirect
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopupGoogleFunc();
      const user = res.user;
      setUser(user);

      const idToken = await user.getIdToken();

      await axiosSecure.post(
        "/users",
        {
          name: user.displayName || "Anonymous",
          email: user.email,
          photoURL: user.photoURL || "",
          role: "customer", // Google login always buyer
          status: "pending",
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

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
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 space-y-6 transform transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
          Register
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...formRegister("name", { required: "Name is required" })}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...formRegister("email", { required: "Email is required" })}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="text-gray-600 mb-1 font-medium">Password</label>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            {...formRegister("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
              validate: {
                hasUpper: (v) =>
                  /[A-Z]/.test(v) || "1 uppercase letter required",
                hasLower: (v) =>
                  /[a-z]/.test(v) || "1 lowercase letter required",
                hasNumber: (v) => /\d/.test(v) || "1 number required",
                hasSymbol: (v) =>
                  /[!@#$%^&*]/.test(v) || "1 special char required",
              },
            })}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-4 top-11 text-gray-400 hover:text-gray-600 cursor-pointer transition duration-200"
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Role</label>
          <select
            {...formRegister("role", { required: "Role is required" })}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition duration-200"
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && (
            <p className="text-red-500 mt-1 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">
            Profile Photo
          </label>
          <input
            type="file"
            {...formRegister("photo")}
            accept="image/*"
            className="file-input file-input-bordered file-input-md w-full rounded-xl"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition duration-200 hover:shadow-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            state={{ from: location }}
            className="text-indigo-600 font-semibold hover:underline hover:text-indigo-700 transition duration-200"
          >
            Login
          </Link>
        </p>

        <div className="flex items-center justify-center space-x-2 mt-2">
          <span className="h-px bg-gray-300 flex-1"></span>
          <span className="text-gray-400 text-sm font-medium">OR</span>
          <span className="h-px bg-gray-300 flex-1"></span>
        </div>

        {/* Google login (modern neutral style) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={`w-full flex items-center justify-center gap-2 cursor-pointer py-3 rounded-lg border `}
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
