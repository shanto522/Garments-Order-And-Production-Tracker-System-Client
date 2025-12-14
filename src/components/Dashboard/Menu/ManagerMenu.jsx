import MenuItem from "./MenuItem";
import { BadgeCheck, Clock, PackageCheck, PlusSquare } from "lucide-react";

const ManagerMenu = () => {
  return (
    <div
      className="
      w-full 
      bg-gradient-to-b from-[#f0f7ff] via-[#e8f3ff] to-[#ffffff]
      rounded-2xl shadow-md shadow-blue-100 
      p-4 flex flex-col gap-1
      sm:max-w-xs md:max-w-sm lg:max-w-md
      mx-auto border border-blue-100
    "
    >
      <MenuItem icon={PlusSquare} label="Add Product" address="add-product" />
      <MenuItem
        icon={PackageCheck}
        label="Manage Product"
        address="manage-products"
      />
      <MenuItem
        icon={BadgeCheck}
        label="Approved Orders"
        address="approved-orders"
      />
      <MenuItem icon={Clock} label="Pending Orders" address="pending-orders" />
    </div>
  );
};

export default ManagerMenu;