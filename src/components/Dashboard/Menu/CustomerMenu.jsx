import MenuItem from "./MenuItem";
import { useState } from "react";
import { FilePlus, MessageCircle, SearchCheck, ShoppingBag } from "lucide-react";
import shoppingIcon from '../../../assets/online-shopping.png'
import feedbackIcon from '../../../assets/message.png'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <div
      className="
      w-full 
      p-4 
      rounded-2xl 
      shadow-lg 
      bg-gradient-to-br from-[#f5f7fa] to-[#dfe9f3]
      sm:max-w-xs md:max-w-sm lg:max-w-md
      mx-auto flex flex-col gap-3
    "
    >
      <MenuItem icon={shoppingIcon} label="My Orders" address="my-orders" />
      <MenuItem icon={feedbackIcon} label="Feedback Form" address="feedbackForm" />
    </div>
  );
};

export default CustomerMenu;