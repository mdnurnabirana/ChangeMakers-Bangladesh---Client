import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { motion } from "motion/react";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Food Drive", "Recycling"];

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    thumbnail: "",
    location: "",
  });
  const [eventDate, setEventDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.length < 5) newErrors.title = "Title must be at least 5 characters";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.length < 250)
      newErrors.description = "Description must be at least 250 characters";
    if (!formData.type) newErrors.type = "Please select an event type";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!eventDate) newErrors.eventDate = "Event date is required";
    else if (eventDate < new Date()) newErrors.eventDate = "Event date must be in the future";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formData, eventDate, userId: user?.uid || "" };
    try {
      setLoading(true);
      const res = await fetch("https://changemakersbd-i6vxk728w-md-nurnabi-ranas-projects.vercel.app/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Event created successfully!");
        navigate("/upcoming-events");
      } else {
        toast.error(data.message || "Failed to create event!");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center"><Loading /></div>;

  return (
    <section className="bg-background min-h-screen p-5 flex justify-center">
      <motion.div
        className="max-w-[660px] w-full mt-20 bg-primary/10 p-8 rounded-2xl drop-shadow-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-3xl font-semibold text-text mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Create Event
        </motion.h1>
        <motion.p
          className="text-primary mb-6 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Let's make the world better together!
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.1, duration: 0.5 }}
        >
          {[
            { label: "Event Title", type: "text", name: "title", placeholder: "Roadside Tree Plantation" },
            { label: "Description", type: "textarea", name: "description", placeholder: "Write details about the event..." },
            { label: "Thumbnail URL", type: "text", name: "thumbnail", placeholder: "https://example.com/image.jpg" },
            { label: "Location", type: "text", name: "location", placeholder: "Dhaka, Bangladesh" },
          ].map((field, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <label className="text-text font-medium mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 bg-background text-text border border-primary rounded-lg outline-primary placeholder:text-text/50 h-28 transition resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 bg-background border border-primary text-text rounded-lg outline-primary placeholder:text-text/50 transition"
                />
              )}
              {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
            </motion.div>
          ))}

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="text-text font-medium mb-1">Event Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="text-text/50 w-full p-3 pl-4 pr-10 bg-background border border-primary/40 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <label className="text-text font-medium mb-1">Event Date</label>
            <DatePicker
              selected={eventDate}
              onChange={setEventDate}
              minDate={new Date()}
              placeholderText="Select event date"
              className="w-full p-3 bg-background border text-text border-primary rounded-lg outline-primary placeholder:text-text/50 transition cursor-pointer"
              dateFormat="MMMM d, yyyy"
            />
            {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-primary text-text font-semibold rounded-lg hover:bg-primary/80 transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Create Event
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default CreateEvent;