import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Food Drive", "Recycling"];

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.length < 5) newErrors.title = "Title must be at least 5 characters";

    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.length < 250) newErrors.description = "Description must be at least 250 characters";

    if (!formData.type) newErrors.type = "Please select an event type";

    if (!formData.thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required";
    else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(formData.thumbnail))
      newErrors.thumbnail = "Enter a valid image URL";

    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (!eventDate) newErrors.eventDate = "Event date is required";
    else if (eventDate < new Date()) newErrors.eventDate = "Event date must be in the future";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...formData,
      eventDate,
      userId: user?.uid || ""
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/event", {
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
        alert(data.message || "Failed to create event!");
      }
    } catch (err) {
      toast.error("Server error!");
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-screen">
      <Navbar />
      <section className="max-w-[660px] mx-auto mt-20 bg-primary/10 p-8 rounded-2xl drop-shadow-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-text mb-2">Create Event</h1>
        <p className="text-primary mb-6 font-semibold">
          Let's make the world better together!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Title */}
          <div className="flex flex-col">
            <label className="text-text font-medium mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="Roadside Tree Plantation"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-primary text-text rounded-lg outline-primary placeholder:text-text/50 transition"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-text font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Write details about the event..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-background text-text border border-primary rounded-lg outline-primary placeholder:text-text/50 h-28 transition resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Event Type */}
          <div className="flex flex-col">
            <label className="text-text font-medium mb-1">Event Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="text-text/50 w-full p-3 pl-4 pr-10 bg-background border border-primary/40 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option className="text-text/70" key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          {/* Thumbnail URL */}
          <div className="flex flex-col">
            <label className="text-text font-medium mb-1">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full p-3 bg-background border text-text border-primary rounded-lg outline-primary placeholder:text-text/50 transition"
            />
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-text font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Dhaka, Bangladesh"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-primary text-text rounded-lg outline-primary placeholder:text-text/50 transition"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* Event Date */}
          <div className="flex flex-col">
            <label className="text-text font-medium mb-1">Event Date</label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date()}
              placeholderText="Select event date"
              className="w-full p-3 bg-background border text-text border-primary rounded-lg outline-primary placeholder:text-text/50 transition cursor-pointer"
              dateFormat="MMMM d, yyyy"
            />
            {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-primary text-text font-semibold rounded-lg hover:bg-primary/80 transition"
          >
            {loading ? <Loading size={35} /> : "Create Event"}
          </button>
        </form>
      </section>
      <Footer />
    </section>
  );
};

export default CreateEvent;