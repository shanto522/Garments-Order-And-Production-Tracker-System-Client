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

  // 🔥 Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleLogOut = () => {
    signOutFunc();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/profile");
        setProfile(res.data);
        setName(res.data.name);
        setPhotoURL(res.data.photoURL);
      } catch (err) {
        toast.error("Failed to fetch profile!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [axiosSecure]);

  const handleUpdateProfile = async () => {
    if (!name.trim()) return toast.error("Name is required");
    setUpdating(true);

    try {
      await axiosSecure.put("/profile", {
        name,
        photoURL,
      });

      setProfile((prev) => ({
        ...prev,
        name,
        photoURL,
      }));

      toast.success("Profile updated successfully!");
      setIsEditOpen(false);
    } catch (err) {
      toast.error("Failed to update profile!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className=" flex justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl md:w-4/5 lg:w-5/5 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center px-6 pt-20 pb-6">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src={profile?.photoURL || "/default-avatar.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="px-5 py-1 mt-4 text-sm font-medium text-white bg-gradient-to-r from-lime-500 to-lime-600 rounded-full">
            {profile?.role}
          </p>

          <p className="mt-2 text-gray-700 font-medium">UID: {user?.uid}</p>

          {/* ✏️ Edit Button */}
          <button
            onClick={() => setIsEditOpen(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Info */}
        <div className="bg-gray-50 p-6 rounded-t-3xl">
          <div className="grid sm:grid-cols-3 gap-20 text-center sm:text-left">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-semibold text-lg break-words">{profile?.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-lg break-words">{profile?.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p
                className={`font-semibold text-lg ${
                  profile?.status === "suspended"
                    ? "text-red-600"
                    : profile?.status === "pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {profile?.status}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleLogOut}
              className="bg-red-500 px-10 py-3 rounded-lg text-white font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-center">Edit Profile</h2>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border px-4 py-2 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="w-full border px-4 py-2 rounded-lg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-5 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                disabled={updating}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
