import MenuItem from "./MenuItem";
import { ClipboardList, PackageSearch, Users } from "lucide-react";

const AdminMenu = () => {
  return (
    <div
      className="
      w-full
      bg-gradient-to-b from-[#f9f9fb] via-[#e0f2fe] to-[#ffffff]
      rounded-2xl shadow-md shadow-blue-100
      p-4 flex flex-col gap-2
      sm:max-w-xs md:max-w-sm lg:max-w-md
      mx-auto border border-blue-100
    "
    >
      <MenuItem icon={ClipboardList} label="All Orders" address="all-orders" />
      <MenuItem icon={Users} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={PackageSearch}
        label="All Product Admin"
        address="all-products-admin"
      />
    </div>
  );
};

export default AdminMenu;