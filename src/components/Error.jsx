import { NavLink } from "react-router";
import errorImg from "../assets/error.png";

const Error = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-3xl mx-auto">
        <div className="my-12 flex justify-center">
          <img
            src={errorImg}
            alt="404 - Page not found"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg drop-shadow-2xl animate-bounce-slow"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 
                       text-white font-semibold px-8 py-4 rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Back to Home
          </NavLink>

          <NavLink
            to={-1}
            className="inline-flex items-center gap-2 border-2 border-primary] 
                       text-primary hover:bg-primary/10 
                       font-semibold px-8 py-4 rounded-full 
                       transition-all duration-300 hover:scale-105"
          >
            Go Back
          </NavLink>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Error;