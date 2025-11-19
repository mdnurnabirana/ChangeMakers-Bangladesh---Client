import React from 'react';
import { FaHandsHelping, FaUsers, FaGlobeAsia, FaMapMarkerAlt } from "react-icons/fa";

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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary">
          What You Can Do with <span className="text-accent">ChangeMakers</span>
        </h2>

        <p className="text-lg max-w-2xl mx-auto text-text/80">
          ChangeMakers enables communities to take bold steps by turning meaningful ideas into real-world action — simple, accessible, and powerful.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl shadow-lg bg-white/15 backdrop-blur border border-white/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;