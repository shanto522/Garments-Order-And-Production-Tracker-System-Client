import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageUserModal from "../../../components/Modal/ManageUserModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  // NEW STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 10; // 10 users per page

  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    axiosSecure
      .get(
        `/users?search=${searchTerm}&role=${filterRole}&status=${filterStatus}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        setUsers(res.data.users);
        setTotalUsers(res.data.total);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filterRole, filterStatus, page]);
  const paginatedUsers = users;
  // Pagination
  const totalPages = Math.ceil(totalUsers / limit);
  const maxVisible = 5;

  const getPages = () => {
    const pages = [];
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  };

  const { pages, start, end } = getPages();
  const approveUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a", // green
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/approve/${userId}`)
          .then(() => {
            toast.success("User approved successfully!");
            fetchUsers(); // refresh user list
          })
          .catch((err) => {
            toast.error("Failed to approve user");
            console.error(err);
          });
      }
    });
  };

  const handleUpdate = (user) => setModalData(user);

  const handleModalSubmit = (updatedRole, suspended, suspendReason) => {
    axiosSecure
      .put(`/users/${modalData._id}`, {
        role: updatedRole,
        status: updatedRole === "manager" ? "approved" : "approved",
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
    <div className="p-4">
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
          <option value="all">Select Roles</option>
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
          <option value="pending">Pending</option>
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
                    {u.suspended
                      ? "Suspended"
                      : u.status === "pending"
                      ? "Pending"
                      : "Active"}
                  </td>
                  <td className="p-3 flex flex-wrap gap-2 sm:flex-nowrap">
                    {/* Pending → only Approve */}
                    {u.role !== "admin" && u.status === "pending" && (
                      <button
                        onClick={() => approveUser(u._id)}
                        className="bg-green-600 text-white px-3 py-2 rounded-md"
                      >
                        Approve
                      </button>
                    )}

                    {/* Approved → only Update */}
                    {u.role !== "admin" && u.status !== "pending" && (
                      <button
                        onClick={() => handleUpdate(u)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-md"
                      >
                        Update
                      </button>
                    )}
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
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {/* Previous */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            Previous
          </button>

          {/* First page */}
          {start > 1 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                1
              </button>
              <span className="px-1 text-gray-500">...</span>
            </>
          )}

          {/* Visible pages */}
          {pages.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded transition
          ${
            page === num
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }
        `}
            >
              {num}
            </button>
          ))}

          {/* Last page */}
          {end < totalPages && (
            <>
              <span className="px-1 text-gray-500">...</span>
              <button
                onClick={() => setPage(totalPages)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
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
