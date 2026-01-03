import { useContext, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import { FiLogOut, FiUser, FiHome } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import avatarFallback from "./../assets/avatar.png";

const Topbar = ({ setIsSidebarOpen }) => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setOpen(false);
  };

  return (
    <header className="h-16 bg-secondary flex items-center justify-between px-4 sm:px-6 sticky top-0 z-33">
      <button onClick={() => setIsSidebarOpen((p) => !p)} className="text-xl">
        <FaBars />
      </button>

      <h1 className="flex-1 px-4 text-lg font-semibold">My Dashboard</h1>

      <div className="relative">
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center gap-3"
        >
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL || avatarFallback}
            onError={(e) => (e.currentTarget.src = avatarFallback)}
            className="w-8 h-8 rounded-full object-cover"
            alt="User"
          />

          <span className="hidden md:block font-medium">
            {user?.displayName || "User"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 bg-background border border-black/10 shadow-xl rounded-xl p-3">
            <p className="font-semibold truncate">{user?.displayName}</p>
            <p className="text-sm opacity-70 truncate mb-3">{user?.email}</p>

            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              <FiHome /> Home
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              <FiUser /> Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg w-full"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
