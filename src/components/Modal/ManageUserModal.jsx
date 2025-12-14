import { useState, useEffect } from "react";

const ManageUserModal = ({ title, user, onClose, onSubmit }) => {
  const [role, setRole] = useState(user.role || "Customer");
  const [suspended, setSuspended] = useState(user.suspended || false);
  const [suspendReason, setSuspendReason] = useState(user.suspendReason || "");

  useEffect(() => {
    setRole(user.role || "Customer");
    setSuspended(user.suspended || false);
    setSuspendReason(user.suspendReason || "");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(role, suspended, suspendReason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="customer">Customer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={suspended}
              onChange={(e) => setSuspended(e.target.checked)}
            />
            <label>Suspend User?</label>
          </div>

          {suspended && (
            <div>
              <label className="block font-medium mb-1">Suspend Reason:</label>
              <input
                type="text"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Reason for suspension"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageUserModal;
