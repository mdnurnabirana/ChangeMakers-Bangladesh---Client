import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiSun, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import avatarFallback from "../assets/avatar.png";
import logo from "../assets/logo.png";
import Loading from "./Loading";
import { AuthContext } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";

const links = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Upcoming Events", link: "/upcoming-events" },
  { id: 3, name: "About", link: "/about" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileClickOpen, setProfileClickOpen] = useState(false);

  const { user, logOut, loading } = useContext(AuthContext);

  const { theme, toggleTheme } = useTheme();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // LOGOUT
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
    setProfileClickOpen(false);
    setMobileMenuOpen(false);
  };

  const activeClass = "text-secondary font-semibold";

  return (
    <header className="sticky top-0 z-9999 bg-background">
      <div className="bg-primary/10 z-9999 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-14" />
            <div className="flex flex-col text-xl font-bold">
              <span className="text-primary">Change</span>
              <span className="text-secondary">Makers</span>
            </div>
          </Link>

          <ul className="hidden md:flex gap-6 list-none font-medium">
            {links.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `hover:text-secondary transition ${
                      isActive ? activeClass : "text-text"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary border-2 border-primary text-text"
            >
              {theme === "light" ? (
                <BsMoonStarsFill size={20} />
              ) : (
                <FiSun size={20} />
              )}
            </button>

            {loading ? (
              <div className="w-10 h-10">
                <Loading size={40} />
              </div>
            ) : user ? (
              <div className="relative group">
                <img
                  src={user.photoURL || avatarFallback}
                  referrerPolicy="no-referrer"
                  onError={(e) => (e.currentTarget.src = avatarFallback)}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer object-cover"
                  onClick={() => setProfileClickOpen(!profileClickOpen)}
                />

                <AnimatePresence>
                  {!profileClickOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 w-56 bg-secondary rounded-lg shadow-lg p-3 z-9999 hidden group-hover:block text-sm text-text"
                    >
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-xs opacity-80">{user.email}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {profileClickOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-secondary rounded-lg shadow-lg p-3 z-99999 flex flex-col gap-2 text-text"
                    >
                      <div className="border-b border-primary/20 pb-2">
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-xs opacity-80">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileClickOpen(false)}
                        className="px-2 py-2 rounded hover:bg-primary/20 transition"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileClickOpen(false)}
                        className="px-2 py-2 rounded hover:bg-primary/20 transition"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="px-2 py-2 rounded flex items-center gap-2 font-semibold text-red-600 hover:bg-red-500/20"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-secondary px-3 py-2 rounded-xl border-2 border-primary text-text font-semibold"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary border-2 border-primary text-text"
            >
              {theme === "light" ? (
                <BsMoonStarsFill size={20} />
              ) : (
                <FiSun size={20} />
              )}
            </button>

            {!loading && user && (
              <div className="relative">
                <img
                  src={user.photoURL || avatarFallback}
                  onError={(e) => (e.currentTarget.src = avatarFallback)}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary object-cover"
                  onClick={() => setProfileClickOpen(!profileClickOpen)}
                />

                <AnimatePresence>
                  {profileClickOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -right-13 top-12 mt-2 w-56 bg-secondary rounded-lg shadow-lg p-3 z-99999 flex flex-col gap-2 text-text"
                    >
                      <div className="border-b border-primary/20 pb-2">
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-xs opacity-80">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileClickOpen(false)}
                        className="px-2 py-2 rounded hover:bg-primary/20 transition"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileClickOpen(false)}
                        className="px-2 py-2 rounded hover:bg-primary/20 transition"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="px-2 py-2 rounded flex items-center gap-2 text-red-600 hover:bg-red-500/20"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-secondary border-2 border-primary"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background w-full px-4 py-4 flex flex-col gap-4 overflow-hidden"
            >
              {links.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-2 py-2 rounded transition hover:bg-primary/20 ${
                      isActive ? activeClass : "text-text"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {!loading && !user && (
                <Link
                  to="/login"
                  className="mt-2 px-4 py-2 rounded-xl border-2 border-primary bg-secondary text-text font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;