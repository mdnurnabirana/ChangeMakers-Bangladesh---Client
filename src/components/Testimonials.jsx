import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "motion/react";

import "swiper/css";

import avatarFallback from "../assets/avatar.png";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Volunteer · Cleanup Drive",
    quote:
      "Joining the river cleanup through ChangeMakers was eye-opening. The teamwork and positive energy made me feel proud to contribute.",
  },
  {
    name: "Tanvir Hasan",
    role: "Organizer · Plantation Event",
    quote:
      "Managing events became incredibly easy. I connected with passionate volunteers within hours of publishing my event.",
  },
  {
    name: "Farzana Akter",
    role: "Participant · Donation Drive",
    quote:
      "ChangeMakers helped me realize how small actions can create big impact. The platform is simple yet powerful.",
  },
  {
    name: "Sabbir Hossain",
    role: "Volunteer · Food Drive",
    quote:
      "Distributing food with other volunteers was a beautiful experience. Everything was well organized and transparent.",
  },
  {
    name: "Nusrat Jahan",
    role: "Community Member",
    quote:
      "I love how ChangeMakers connects people who truly care. It feels like a movement, not just a platform.",
  },
  {
    name: "Imran Kabir",
    role: "Volunteer · Recycling Campaign",
    quote:
      "The recycling drive taught me practical ways to reduce waste. I’m more conscious now because of this initiative.",
  },
  {
    name: "Rifat Mahmud",
    role: "Student Volunteer",
    quote:
      "As a student, this platform gave me a chance to contribute meaningfully while learning leadership and teamwork.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-background pt-10 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Voices From Our Community
          </h2>
          <p className="mt-4 text-md lg:text-lg text-text/80 max-w-2xl mx-auto">
            Hear from volunteers and organizers who are creating real change
            across Bangladesh
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          slidesPerView={1}
          grabCursor
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-full flex">
              <div
                className="
                  h-full
                  flex flex-col justify-between
                  bg-linear-to-b from-secondary/50 to-accent/50
                  backdrop-blur
                  border border-primary/20
                  rounded-2xl p-6
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-primary/30
                "
              >
                <div>
                  <FaQuoteLeft className="text-primary/40 text-2xl mb-4" />
                  <p className="text-text/90 leading-relaxed line-clamp-3">
                    “{item.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <img
                    src={avatarFallback}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-primary/30"
                  />
                  <div>
                    <h4 className="font-semibold text-text">{item.name}</h4>
                    <p className="text-sm text-text/70">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;