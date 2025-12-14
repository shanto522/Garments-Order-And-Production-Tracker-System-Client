import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageUserModal from "../../../components/Modal/ManageUserModal";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState(null);

  // NEW STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 10; // 10 users per page

  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // 🔍 FILTER + SEARCH LOGIC
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" ? true : u.role === filterRole;

    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
        ? !u.suspended
        : u.suspended;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  const handleUpdate = (user) => setModalData(user);

  const handleModalSubmit = (updatedRole, suspended, suspendReason) => {
    axiosSecure
      .put(`/users/${modalData._id}`, {
        role: updatedRole,
        suspended,
        suspendReason,
      })
      .then(() => {
        fetchUsers();
        setModalData(null);
        toast.success("User updated successfully!"); // ✅ Hot toast success
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update user!"); // ✅ Hot toast error
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Manage Users
      </h2>

      {/* 🔍 Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border p-2 rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded-md w-full md:w-1/4"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="customer">Customer</option>
        </select>

        <select
          className="border p-2 rounded-md w-full md:w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-3 text-left">Name</th>
              <th className="border-b p-3 text-left">Email</th>
              <th className="border-b p-3 text-left">Role</th>
              <th className="border-b p-3 text-left">Status</th>
              <th className="border-b p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role || "pending"}</td>
                  <td className="p-3">
                    {u.suspended ? "Suspended" : "Active"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleUpdate(u)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-md"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}

      {modalData && (
        <ManageUserModal
          title={`Update Role / Suspend for ${modalData.name}`}
          user={modalData}
          onClose={() => setModalData(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default ManageUsers;
