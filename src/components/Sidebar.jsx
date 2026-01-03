import { Link, NavLink } from "react-router";
import { FiHome, FiCalendar, FiEdit3, FiCheckCircle, FiX } from "react-icons/fi"; 
import logo from "./../assets/logo.png";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiHome />, end: true },
  {
    name: "Create Event",
    path: "/dashboard/create-event",
    icon: <FiCalendar />,
  },
  { name: "Manage Events", path: "/dashboard/manage-event", icon: <FiEdit3 /> },
  { name: "Joined Events", path: "/dashboard/joined-event", icon: <FiCheckCircle /> },
];

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex flex-col
        bg-background sm:bg-primary/10 text-text
        transition-all duration-300 ease-in-out
        w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
        ${isOpen ? "sm:w-64" : "sm:w-20"}
      `}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b-2 border-black/10">
        {isOpen ? (
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12" />
            <div className="flex flex-col text-xl font-bold">
              <span className="text-primary">Change</span>
              <span className="text-secondary">Makers</span>
            </div>
          </Link>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 justify-center w-full"
          >
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
        )}
        {isOpen && (
          <button
            className="sm:hidden text-2xl text-text"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX />
          </button>
        )}
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
            onClick={() => setIsSidebarOpen(false)}
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