// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { signUpFunc, setUser, signInWithPopupGoogleFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            {...formRegister("name", { required: "Name is required" })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            {...formRegister("email", { required: "Email is required" })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
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
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role dropdown */}
        <div className="flex flex-col">
          <select
            {...formRegister("role", { required: "Role is required" })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
          <input
            type="file"
            {...formRegister("photo")}
            accept="image/*"
            className="file-input file-input-bordered file-input-md w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            state={{ from: location }}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="flex items-center justify-center space-x-2 mt-2">
          <span className="h-px bg-gray-300 flex-1"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="h-px bg-gray-300 flex-1"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Register / Login with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
