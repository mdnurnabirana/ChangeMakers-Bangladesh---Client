import React, { useState } from "react";
import { motion } from "motion/react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseAdmin = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: import.meta.env.VITE_SERVICE_ID,
            template_id: import.meta.env.VITE_TEMPLATE_ID, // your admin template
            user_id: import.meta.env.VITE_USER_ID,
            template_params: { ...formData },
          }),
        }
      );

      if (!responseAdmin.ok) throw new Error("Failed to send admin email");

      const responseUser = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: import.meta.env.VITE_SERVICE_ID,
            template_id: import.meta.env.VITE_CONFIRMATION_TEMPLATE_ID,
            user_id: import.meta.env.VITE_USER_ID,
            template_params: {
              name: formData.name,
              email: formData.email,
              message: formData.message,
              time: new Date().toLocaleString(),
              year: new Date().getFullYear(),
            },
          }),
        }
      );

      if (!responseUser.ok)
        throw new Error("Failed to send confirmation email");

      toast.success(
        "Message sent! A confirmation email has been sent to your inbox."
      );

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background text-text pt-10 sm:pt-15">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Get in Touch with Us
        </motion.h1>

        <motion.div
          className="bg-secondary/10 p-4 sm:p-8 rounded-3xl border border-primary/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-primary/30 rounded-xl bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-primary/30 rounded-xl bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full px-4 py-2 border border-primary/30 rounded-xl bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                className="w-full px-4 py-2 border border-primary/30 rounded-xl bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-background font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;