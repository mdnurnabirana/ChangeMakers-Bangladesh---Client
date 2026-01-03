import { motion } from "motion/react";
import authorImg from "../assets/author.webp"
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

const About = () => {
  return (
    <>
      <title>About</title>
      <section className="bg-background text-text pt-20">
      <div className="max-w-[1296px] mx-auto px-5">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center">
            About ChangeMakers
          </h1>
          <p className="text-lg text-text/70 max-w-2xl mx-auto mt-4">
            Empowering communities. Inspiring action. Creating a better Bangladesh together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-text/80 leading-relaxed">
              ChangeMakers is a community-driven platform built to bring volunteers, organizers,
              and social impact projects together in one place. Our mission is simple:
              <strong> connect people with opportunities that make Bangladesh cleaner, greener,
              and kinder.</strong>
            </p>
            <p className="mt-4 text-text/80 leading-relaxed">
              Whether it’s a beach cleanup, a donation drive, a tree plantation event,
              or a community outreach program, we help individuals discover meaningful ways
              to contribute — and help organizers reach the right volunteers effortlessly.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-primary/10 p-8 rounded-xl border border-primary/30 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-3 text-primary">What We Stand For</h3>
            <ul className="space-y-3 text-text/80">
              <li>🌱 Environmental Protection & Awareness</li>
              <li>🤝 Community Development & Engagement</li>
              <li>🎗️ Social Responsibility & Support</li>
              <li>💡 Empowering Volunteers & Event Organizers</li>
              <li>🌍 Creating a Better Tomorrow, Together</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-primary mb-10">
            Why ChangeMakers?
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[ 
              {
                title: "Easy Event Discovery",
                text: "Find social service events happening near you with powerful search, filters, and categories."
              },
              {
                title: "One-Click Participation",
                text: "Join events instantly and track all your upcoming, joined, and completed activities."
              },
              {
                title: "Empowering Organizers",
                text: "Create, manage, and promote events with ease. Connect with volunteers who care."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 bg-secondary/10 rounded-xl border border-primary/30 shadow hover:scale-105 hover:shadow-primary/40 transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">{item.title}</h3>
                <p className="text-text/70">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="bg-linear-to-br from-primary via-accent to-secondary rounded-2xl p-10 text-text shadow-xl mb-20"
        >
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed opacity-90">
            We envision a future where community service becomes a natural part of everyday life —
            where every individual can easily discover meaningful opportunities to contribute,
            and every good cause gets the support it deserves.
          </p>
          <p className="text-lg mt-4 leading-relaxed opacity-90">
            Change begins with awareness, grows through action, and becomes powerful
            when we act together. With ChangeMakers, we aim to make that unity possible.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">
            The Heart Behind ChangeMakers
          </h2>
          <p className="max-w-2xl mx-auto text-text/70 mb-10">
            We are a passionate group of developers, volunteers, and community enthusiasts
            committed to building a platform that inspires hope and encourages positive change.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mt-5">
            <motion.div
              variants={fadeUp}
              className="p-6 bg-secondary/10 rounded-xl border border-primary/30 shadow text-center w-64"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20">
                <img
                  src={authorImg}
                  alt="Team Founder"
                  referrerpolicy="no-referrer"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-primary">Md Nurnabi Rana</h3>
              <p className="text-text/60">Founder & Developer</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
    </>
  );
};

export default About;