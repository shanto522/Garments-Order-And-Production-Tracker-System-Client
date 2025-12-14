import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-3 my-3 rounded-xl 
        transition-all duration-300 ease-in-out
        hover:bg-blue-100 hover:text-slate-800 active:scale-[0.98]
        ${
          isActive
            ? "bg-blue-200/70 text-slate-900 font-semibold shadow-sm"
            : "text-slate-700"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium text-[15px] tracking-wide">
        {label}
      </span>
    </NavLink>
  );
};

export default MenuItem;
