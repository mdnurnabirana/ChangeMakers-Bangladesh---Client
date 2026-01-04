import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { motion } from "motion/react";
import { useEffect } from "react";

const Banner = () => {
  const slides = [
    {
      image: slider1,
      title: "Together We Are Stronger",
      desc: "United hands, shared dreams — building a brighter future for everyone.",
    },
    {
      image: slider2,
      title: "Growing Hope, One Tree at a Time",
      desc: "Every plant we nurture today becomes oxygen and shade for tomorrow.",
    },
    {
      image: slider3,
      title: "Caring for Our Planet, Together",
      desc: "Small actions by many create big change. Join us in keeping nature beautiful.",
    },
  ];

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        speed={900}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        preloadImages={true}
        watchSlidesProgress
        observer
        observeParents
        className="h-[70vh] sm:h-[75vh] lg:h-[80vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-4xl"
                >
                  <h1
                    className="font-bold tracking-tight text-white drop-shadow-xl
                               text-3xl xs:text-4xl sm:text-5xl lg:text-6xl
                               leading-snug sm:leading-tight"
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="mx-auto mt-5 max-w-2xl text-base
                               xs:text-md sm:text-lg lg:text-xl
                               font-medium text-white/90 drop-shadow-md"
                  >
                    {slide.desc}
                  </p>

                  <div className="mt-10">
                    <Link
                      to="/upcoming-events"
                      className="inline-block rounded-full bg-primary
                                 px-8 py-3.5 text-lg font-semibold text-white
                                 shadow-lg transition-all duration-300
                                 hover:bg-primary/90 hover:scale-105
                                 active:scale-95"
                    >
                      Join Our Mission
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #61ae98;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </section>
  );
};

export default Banner;