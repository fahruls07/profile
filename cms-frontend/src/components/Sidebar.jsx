import { NavLink } from "react-router-dom";
import { Home, BookOpen, Briefcase, GraduationCap, FileText, Phone } from "lucide-react";

const menus = [
  { name: "Profile", path: "/profile", icon: Home },
  { name: "Experiences", path: "/experiences", icon: Briefcase },
  { name: "Education", path: "/education", icon: GraduationCap },
  { name: "Articles", path: "/articles", icon: FileText },
  { name: "Contact", path: "/contact", icon: Phone },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 flex flex-col shadow-lg`}
    >
      <div className="flex items-center justify-center py-4 font-bold text-xl">
        CMS
      </div>
      <nav className="flex-1 px-2 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <menu.icon className="w-5 h-5 mr-3" />
            <span className={`${open ? "block" : "hidden"} md:block`}>
              {menu.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
