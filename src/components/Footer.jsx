import { Link } from "react-router";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="pt-20 bg-background">
      <footer className="bg-primary/10 text-text pt-8 pb-8 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-14">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Link to="/" className="flex justify-center gap-4 md:justify-start">
              <img
                src={logo}
                alt="ChangeMakers Logo"
                className="h-18 w-auto"
              />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-text text-2xl font-semibold">Change</h1>
                <h1 className="text-primary text-2xl font-semibold">Makers</h1>
              </div>
            </Link>
            <p className="text-text/70 leading-relaxed max-w-xs">
              ChangeMakers is a community-driven platform connecting people with
              nearby social service events. Empowering change, one event at a
              time.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <h2 className="font-semibold text-xl text-text mb-2">
              Quick Links
            </h2>
            <Link
              to="/"
              className="hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="hover:text-accent transition-colors duration-200"
            >
              All Events
            </Link>
            <Link
              to="/about"
              className="hover:text-accent transition-colors duration-200"
            >
              About 
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h2 className="font-semibold text-xl text-text mb-2">Follow Us</h2>

            <div className="flex space-x-5">
              <a
                href="https://github.com/mdnurnabirana"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://www.facebook.com/mdNurnabiRana00/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
              >
                <FaFacebookF size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-nurnabi-rana-/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
              >
                <FaLinkedinIn size={30} />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1296px] mx-auto px-5 mt-10 pt-6 border-t-2 border-primary/40 text-center text-text/70 text-sm">
          &copy; {new Date().getFullYear()} ChangeMakers. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
