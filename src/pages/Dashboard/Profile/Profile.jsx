import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Profile = () => {
  const { user, signOutFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogOut = () => {
    signOutFunc();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [axiosSecure]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-white flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl md:w-4/5 lg:w-3/5 overflow-hidden relative">
        {/* Header */}
        <div className="flex flex-col items-center relative px-6 pt-20 pb-6">
          {/* Profile Image */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              alt="profile"
              src={user?.photoURL || profile?.photoURL || "/default-avatar.png"}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Role Badge */}
          <p className="px-5 py-1 mt-4 text-sm sm:text-base md:text-base font-medium text-white bg-gradient-to-r from-lime-500 to-lime-600 rounded-full shadow-lg">
            {profile?.role || "Customer"}
          </p>

          {/* UID */}
          <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-700 font-medium tracking-wide">
            UID: {user?.uid}
          </p>
        </div>

        {/* Profile Info */}
        <div className="w-full mt-6 p-6 bg-gray-50 rounded-t-3xl shadow-inner flex flex-col gap-6 items-center">
          {/* Name, Email & Status */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 w-full text-center sm:text-left">
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium text-sm sm:text-base md:text-base">
                Name
              </span>
              <span className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl">
                {user?.displayName || profile?.name || "N/A"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 font-medium text-sm sm:text-base md:text-base">
                Email
              </span>
              <span className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl">
                {user?.email || profile?.email || "N/A"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 font-medium text-sm sm:text-base md:text-base">
                Status
              </span>
              <span
                className={`font-semibold text-base sm:text-lg md:text-xl ${
                  profile?.status === "Suspended"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {profile?.status || "Active"}
              </span>
            </div>
          </div>

          {/* Suspend Feedback */}
          {profile?.status === "Suspended" && profile?.suspendFeedback && (
            <div className="mt-4 w-full p-4 bg-red-100 rounded-md border border-red-300 text-left">
              <h3 className="font-semibold text-red-700 mb-1">
                Suspend Feedback:
              </h3>
              <p className="text-red-600">{profile.suspendFeedback}</p>
            </div>
          )}

          {/* Logout Button */}
          <div className="flex justify-center mt-6 w-full">
            <button
              onClick={handleLogOut}
              className="bg-red-500 px-10 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-xl active:scale-[0.97]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
