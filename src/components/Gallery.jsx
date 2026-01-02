import { motion } from "motion/react";
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

const Gallery = () => {
  const photos = [
    { src: gallery1, size: "row-span-1 col-span-1", title: "Beach Cleaning" },
    { src: gallery2, size: "col-span-2", title: "Canal-Side Cleanup" },
    { src: gallery3, size: "row-span-1", title: "Clean the Beach, Free the Sea from Plastic" },
    { src: gallery4, size: "col-span-2 row-span-1", title: "Bringing Smiles to Children" },
    { src: gallery5, size: "col-span-1", title: "Free Education for Children" },
    { src: gallery6, size: "col-span-2", title: "Voluntary Community Service" },
    { src: gallery7, size: "row-span-2", title: "Free Meals for Everyone" },
    { src: gallery8, size: "col-span-2", title: "Free Medical Checkups and Treatment" },
    { src: gallery9, size: "row-span-2", title: "Mosquito Prevention Spray Camp" },
    { src: gallery10, size: "col-span-1 row-span-1", title: "Clean the Forest, Breathe Fresh Air" },
  ];

  return (
    <section className="pt-15 lg:pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-3 lg:px-4">
        <motion.div
          className="text-center mb-6 lg:mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
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
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.08, type: "spring", stiffness: 70 }}
              whileHover={{ scale: 1.03 }}
              className={`
                relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                ${photo.size}
              `.trim()}
            >
              <img
                src={photo.src}
                alt={`Event moment ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-semibold text-lg drop-shadow-2xl">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;