import React from 'react';
import { FaHandsHelping, FaUsers, FaGlobeAsia, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "motion/react";

const Featured = () => {
  const features = [
    {
      icon: <FaHandsHelping className="text-4xl" />, 
      title: "Empower Local Heroes", 
      desc: "Create and manage impactful community-driven initiatives with ease.",
    },
    {
      icon: <FaUsers className="text-4xl" />, 
      title: "Stronger Together", 
      desc: "Collaborate with passionate individuals to amplify your mission.",
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl" />, 
      title: "Location-Focused Missions", 
      desc: "Discover and join activities happening near you instantly.",
    },
    {
      icon: <FaGlobeAsia className="text-4xl" />, 
      title: "Global Changemakers", 
      desc: "Expand your reach and drive transformation beyond borders.",
    },
  ];

  return (
    <section className="w-full pt-10 sm:pt-20 px-4 bg-background text-text">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary"
          >
            What You Can Do with <span className="text-accent">ChangeMakers</span>
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 60 }}
            className="text-lg max-w-2xl mx-auto text-text/80"
          >
            ChangeMakers enables communities to take bold steps by turning meaningful ideas into real-world action — simple, accessible, and powerful.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
              whileHover={{ scale: 1.04 }}
              className="p-8 rounded-2xl shadow-lg bg-white/15 backdrop-blur border border-white/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;