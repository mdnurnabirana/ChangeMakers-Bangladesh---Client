import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        speed={800}
        className="h-[70vh] sm:h-[75vh] lg:h-[80vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
                <div className="max-w-4xl">
                  <h1
                    className="font-bold tracking-tight text-white drop-shadow-xl
                               text-3xl xs:text-4xl 
                               sm:text-5xl 
                               lg:text-6xl 
                               leading-snug sm:leading-tight"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="mx-auto mt-5 max-w-2xl text-base 
                               xs:text-md sm:text-lg lg:text-xl 
                               font-medium text-white/90 drop-shadow-md"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {slide.desc}
                  </p>

                  <div className="mt-10">
                    <button
                      className="rounded-full bg-primary
                                 px-8 py-3.5 text-lg font-semibold text-white 
                                 shadow-lg transition-all duration-300 
                                 hover:bg-primary/90 
                                 hover:scale-105 hover:shadow-xl 
                                 active:scale-98"
                    >
                      Join Our Mission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Clean, minimal pagination */}
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