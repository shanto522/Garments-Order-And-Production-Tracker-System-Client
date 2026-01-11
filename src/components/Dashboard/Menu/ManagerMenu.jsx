import MenuItem from "./MenuItem";
import { BadgeCheck, Clock, PackageCheck, PlusSquare } from "lucide-react";
import addProductIcon from '../../../assets/add-product.png'
import manageProductIcon from '../../../assets/services.png'
import approvedIcon from '../../../assets/bag.png'
import pendingIcon from '../../../assets/shopping-bag (1).png'

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
      <MenuItem icon={addProductIcon} label="Add Product" address="add-product" />
      <MenuItem
        icon={manageProductIcon}
        label="Manage Product"
        address="manage-products"
      />
      <MenuItem
        icon={approvedIcon}
        label="Approved Orders"
        address="approved-orders"
      />
      <MenuItem icon={pendingIcon} label="Pending Orders" address="pending-orders" />
    </div>
  );
};

export default ManagerMenu;