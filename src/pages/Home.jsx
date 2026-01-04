import React from "react";
import Banner from "../components/Banner";
import Gallery from "../components/Gallery";
import Featured from "../components/Featured";
import NewsLetter from "../components/NewsLetter";
import FAQ from "./FAQ";
import CategoryMarquee from "../components/CategoryMarquee";
import Testimonials from "../components/Testimonials";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "400px", 
  });
  return (
    <>
      <Banner />
      <Featured />
      <CategoryMarquee />
      <div ref={ref}>{inView && <Gallery />}</div>
      <FAQ />
      <Testimonials />
      <NewsLetter />
    </>
  );
};

export default Home;