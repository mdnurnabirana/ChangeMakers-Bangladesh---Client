import Marquee from "react-fast-marquee";
import {
  FaTrashAlt,
  FaTree,
  FaHandHoldingHeart,
  FaRecycle,
  FaUtensils,
} from "react-icons/fa";

const categories = [
  { name: "Cleanup", icon: FaTrashAlt, color: "text-green-600" },
  { name: "Plantation", icon: FaTree, color: "text-emerald-600" },
  { name: "Donation", icon: FaHandHoldingHeart, color: "text-pink-600" },
  { name: "Food Drive", icon: FaUtensils, color: "text-orange-500" },
  { name: "Recycling", icon: FaRecycle, color: "text-blue-600" },
];

const CategoryMarquee = () => {
  return (
    <section className="bg-background pt-20 overflow-hidden">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
          Explore Event Categories
        </h2>
        <p className="mt-4 text-md lg:text-lg text-text/80 max-w-2xl mx-auto">
          Discover meaningful ways to contribute and create real impact
        </p>
      </div>

      <Marquee
        pauseOnHover
        speed={40}
        gradient
        gradientWidth={80}
        gradientColor={[0, 0, 0]} 
        autoFill
      >
        {categories.map(({ name, icon: Icon, color }, index) => (
          <div
            key={index}
            role="button"
            aria-label={name}
            className="mx-5 flex items-center gap-4
              bg-secondary/10 backdrop-blur
              border border-primary/20
              rounded-2xl px-6 py-4
              shadow-sm
              transition-all duration-300
              hover:scale-105 hover:shadow-primary/30
              cursor-pointer"
          >
            <div
              className={`flex items-center justify-center
                w-12 h-12 rounded-full
                bg-primary/10 ${color}`}
            >
              <Icon className="text-2xl" />
            </div>

            <span className="text-lg font-semibold text-text whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default CategoryMarquee;