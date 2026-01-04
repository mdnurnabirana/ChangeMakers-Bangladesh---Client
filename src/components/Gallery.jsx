import { motion } from "motion/react";
import { useState } from "react";

import gallery1 from "../assets/gallery1.webp";
import gallery2 from "../assets/gallery2.webp";
import gallery3 from "../assets/gallery3.webp";
import gallery4 from "../assets/gallery4.webp";
import gallery5 from "../assets/gallery5.webp";
import gallery6 from "../assets/gallery6.webp";
import gallery7 from "../assets/gallery7.webp";
import gallery8 from "../assets/gallery8.webp";
import gallery9 from "../assets/gallery9.webp";
import gallery10 from "../assets/gallery10.webp";

const ImageSkeleton = () => (
  <div className="absolute inset-0 rounded-2xl bg-gray-200 animate-pulse" />
);

const GalleryImage = ({ src, title }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {!loaded && <ImageSkeleton />}

      <img
        src={src}
        alt={title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700 ease-out
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />

      <div
        className={`
          pointer-events-none absolute inset-0 flex items-end p-6
          bg-linear-to-t from-black/70 via-black/10 to-transparent
          transition-opacity duration-500
          ${loaded ? "opacity-0 group-hover:opacity-100" : "opacity-0"}
        `}
      >
        <p className="text-white font-semibold text-lg drop-shadow-xl">
          {title}
        </p>
      </div>
    </div>
  );
};

const Gallery = () => {
  const photos = [
    { src: gallery1, size: "col-span-1", title: "Beach Cleaning" },
    { src: gallery2, size: "col-span-2", title: "Canal-Side Cleanup" },
    { src: gallery3, size: "col-span-1", title: "Clean the Beach, Free the Sea from Plastic" },
    { src: gallery4, size: "col-span-2", title: "Bringing Smiles to Children" },
    { src: gallery5, size: "col-span-1", title: "Free Education for Children" },
    { src: gallery6, size: "col-span-2", title: "Voluntary Community Service" },
    { src: gallery7, size: "row-span-2", title: "Free Meals for Everyone" },
    { src: gallery8, size: "col-span-2", title: "Free Medical Checkups and Treatment" },
    { src: gallery9, size: "row-span-2", title: "Mosquito Prevention Spray Camp" },
    { src: gallery10, size: "col-span-1", title: "Clean the Forest, Breathe Fresh Air" },
  ];

  return (
    <section className="pt-16 lg:pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-3 lg:px-4">
        <motion.div
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Event Gallery
          </h1>
          <p className="mt-4 text-md lg:text-lg text-text/80 max-w-2xl mx-auto">
            Capturing moments of unity, care, and positive change.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[260px] lg:auto-rows-[300px] grid-flow-dense">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${photo.size}`}
            >
              <GalleryImage src={photo.src} title={photo.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;