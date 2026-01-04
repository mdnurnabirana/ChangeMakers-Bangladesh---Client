import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Who can join these events?",
    answer:
      "Anyone can join! Students, professionals, families, and community members are welcome. No prior experience is required—just a willingness to help.",
  },
  {
    question: "Is there any cost to participate?",
    answer:
      "No. All events listed on ChangeMakers are completely free to join. Some events may suggest bringing personal items like gloves or water bottles.",
  },
  {
    question: "What should I bring to an event?",
    answer:
      "This depends on the event type. Cleanup events may require gloves, plantation events may involve digging tools, and donation drives may simply require your contribution.",
  },
  {
    question: "Can I join multiple events?",
    answer:
      "Absolutely! You can join as many events as you like and track them from your dashboard.",
  },
  {
    question: "How do I know my contribution matters?",
    answer:
      "Each event is organized by verified community members or organizations. Your participation directly supports environmental protection, social welfare, and community development.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-background text-text pt-20">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-md lg:text-lg text-text/80 max-w-2xl mx-auto">
            Everything you need to know before joining an event
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-linear-to-r from-secondary/60 to-accent/70 border border-primary/30 rounded-xl shadow"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-lg text-text/80">
                  {faq.question}
                </span>
                <span className="text-xl text-text/80">
                  {activeIndex === index ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-text/70 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;