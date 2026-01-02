import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Subscribed successfully! 🎉");
    setEmail("");
  };

  return (
    <section className="w-full bg-background text-text pt-10 sm:pt-20">
      <div className="mx-auto text-center bg-linear-to-br from-primary via-secondary to-accent">
        <div className="sm:py-20 py-10 sm:px-0 px-5 bg-white/10 backdrop-blur-xl shadow-xl border border-white/30">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-lg text-text/80 max-w-2xl mx-auto mb-10">
              Subscribe to receive exclusive updates, impactful stories, and the
              latest insights from ChangeMakers.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-background border-2 border-secondary/30 text-text shadow focus:outline-none focus:border-accent transition"
            />
            <button
              type="submit"
              className="w-auto px-8 py-4 rounded-xl bg-accent text-text font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;