import MenuItem from "./MenuItem";
import { ClipboardList, PackageSearch, Users } from "lucide-react";
import allOrderIcon from "../../../assets/package.png";
import manageUserIcon from "../../../assets/team.png";
import allProductIcon from "../../../assets/shopping-cart.png";
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
      <MenuItem icon={allProductIcon} label="All Orders" address="all-orders" />
      <MenuItem icon={manageUserIcon} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={allOrderIcon}
        label="All Product Admin"
        address="all-products-admin"
      />
    </div>
  );
};

export default AdminMenu;
