import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiSun, FiMenu, FiX } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import avatarFallback from "../assets/avatar.png";
import logo from "../assets/logo.png";
import Loading from "./Loading";

const links = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Upcoming Events", link: "/upcoming-events" },
  { id: 3, name: "About", link: "/about" },
];

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { user, logOut, loading } = useContext(AuthContext);

  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary text-text shadow-sm top-0 left-0 w-full z-50">
      <div className="max-w-[1296px] mx-auto flex justify-between items-center p-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-14" />
          <div className="flex flex-col text-xl font-bold">
            <span className="text-background">Change</span>
            <span className="text-secondary">Makers</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 list-none">
          {links.map((item) => (
            <li key={item.id} className="cursor-pointer font-medium">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `hover:text-text transition ${
                    isActive ? "text-text font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary border-2 border-primary text-text"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <BsMoonStarsFill size={20} />
            ) : (
              <FiSun size={20} />
            )}
          </button>

          {/* Profile / Login */}
          {user ? (
            <div className="relative">
              {!loading ? (
                <img
                  src={user.photoURL || avatarFallback}
                  alt={user.displayName || "User"}
                  onError={(e) => (e.currentTarget.src = avatarFallback)}
                  className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-primary"
                  onClick={toggleProfileMenu}
                />
              ) : (
                <div className="w-10 h-10">
                  <Loading size={40} />
                </div>
              )}

              {profileMenuOpen && !loading && (
                <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2 flex flex-col gap-2 z-50">
                  <Link
                    to="/create-event"
                    className="px-4 py-2 hover:bg-primary/20 rounded transition"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/manage-event"
                    className="px-4 py-2 hover:bg-primary/20 rounded transition"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/joined-events"
                    className="px-4 py-2 hover:bg-primary/20 rounded transition"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Joined Events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-500/20 text-red-600 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="bg-secondary px-3 py-2 rounded-xl border-2 border-primary text-text font-semibold"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary border-2 border-primary text-text"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <BsMoonStarsFill size={20} />
            ) : (
              <FiSun size={20} />
            )}
          </button>

          {user && (
            <div className="relative">
              {!loading ? (
                <img
                  src={user.photoURL || avatarFallback}
                  alt={user.displayName || "User"}
                  onError={(e) => (e.currentTarget.src = avatarFallback)}
                  className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-primary"
                  onClick={toggleProfileMenu}
                />
              ) : (
                <div className="w-10 h-10">
                  <Loading size={40} />
                </div>
              )}

              {profileMenuOpen && !loading && (
                <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg py-2 flex flex-col gap-2 z-50">
                  <Link
                    to="/create-event"
                    className="px-4 py-2 hover:bg-primary/20 rounded transition"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/manage-event"
                    className="px-4 py-2 hover:bg-primary/20 rounded transition"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/joined-event"
                    className="px-4 py-2 hover:bg-primary/20 rounded transition"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Joined Events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-500/20 text-red-600 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-secondary border-2 border-primary"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background w-full px-4 py-4 flex flex-col gap-4">
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `px-2 py-2 rounded transition hover:bg-primary/20 ${
                  isActive ? "text-text font-semibold" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          {!user && (
            <Link
              to="/auth/login"
              className="mt-2 px-4 py-2 rounded-xl border-2 border-primary bg-secondary text-text font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;