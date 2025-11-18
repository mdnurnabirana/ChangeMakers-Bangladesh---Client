import { useEffect, useState } from "react";
import logo from "./../assets/logo.png";
import { FiSun, FiMenu, FiX } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";

const links = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Upcoming Events", link: "#" },
  { id: 3, name: "About", link: "#" },
];

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleMenu = () => setOpen(!open);

  return (
    <header className="bg-background text-text shadow-sm">
      <section className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex justify-between items-center gap-3">
          <img src={logo} alt="ChangeMakers Bangladesh" className="h-14" />
          <div className="flex flex-col text-xl font-bold">
            <h1 className="text-primary">Change</h1>
            <h1 className="text-secondary">Makers</h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 list-none">
          {links.map((item) => (
            <li key={item.id} className="cursor-pointer">
              {item.name}
            </li>
          ))}
        </ul>

        {/* Right Buttons (desktop only) */}
        <div className="hidden md:flex justify-between items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary text-text border-2 border-primary"
          >
            {theme === "light" ? (
              <BsMoonStarsFill size={20} />
            ) : (
              <FiSun size={20} />
            )}
          </button>

          <button className="bg-secondary px-3 py-2 rounded-xl border-2 border-primary text-text font-semibold">
            Login
          </button>
        </div>

        {/* Right Buttons (mobile) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary text-text border-2 border-primary"
          >
            {theme === "light" ? (
              <BsMoonStarsFill size={20} />
            ) : (
              <FiSun size={20} />
            )}
          </button>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-secondary border-2 border-primary"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </section>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-background transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 px-6 py-4" : "max-h-0 px-6 py-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {links.map((item) => (
            <li key={item.id} className="cursor-pointer text-lg">
              {item.name}
            </li>
          ))}
        </ul>

        <button className="mt-6 w-full bg-secondary px-3 py-2 rounded-xl border-2 border-primary text-text font-semibold">
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;