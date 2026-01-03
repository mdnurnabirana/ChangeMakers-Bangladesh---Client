import { Link, NavLink } from "react-router";
import { FiHome, FiCalendar, FiUsers } from "react-icons/fi";
import logo from "./../assets/logo.png";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiHome />, end: true },
  { name: "Create Event", path: "/dashboard/create-event", icon: <FiCalendar /> },
  { name: "Members", path: "/dashboard/members", icon: <FiUsers /> },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`hidden sm:flex sm:flex-col sm:fixed sm:inset-y-0 sm:left-0 z-40 transition-all duration-300
        bg-primary/10 text-text ${isOpen ? "sm:w-64" : "sm:w-20"}
      `}
    >
      <div className="h-16 flex items-center px-4 border-b-2 border-black/10">
        <span className="font-bold text-lg truncate">
          {isOpen ? (
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-12" />
              <div className="flex flex-col text-xl font-bold">
                <span className="text-primary">Change</span>
                <span className="text-secondary">Makers</span>
              </div>
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-12" />
            </Link>
          )}
        </span>
      </div>

      <nav className="flex-1 mt-4 px-2 space-y-1">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-lg transition
              ${isActive ? "bg-primary/70 text-white" : "hover:bg-accent/20"}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;