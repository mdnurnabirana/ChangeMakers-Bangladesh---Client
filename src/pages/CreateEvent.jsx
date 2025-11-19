import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { FaChevronDown } from "react-icons/fa";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Recycling",
];

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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate || eventDate < new Date()) {
      return alert("Event date must be a future date!");
    }

    const payload = {
      ...formData,
      eventDate,
      creatorEmail: user?.email,
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Event created successfully!");
        navigate("/upcoming-events");
      } else {
        alert("Failed to create event!");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-screen">
      <Navbar />

      <section className="max-w-[660px] mx-auto mt-20 bg-primary/10 p-8 rounded-2xl shadow-lg p-4">
        <h1 className="text-3xl font-semibold text-text mb-2">Create Event</h1>
        <p className="text-primary mb-6 font-semibold">
          Let's make the world better together!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-text font-medium mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Roadside Tree Plantation"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-primary text-text rounded-lg outline-primary
                         placeholder:text-text/50 transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-text font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              placeholder="Write details about the event..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-background text-text border border-primary rounded-lg outline-primary
                         placeholder:text-text/50 h-28 transition resize-none"
            ></textarea>
          </div>

          {/* Event Type Select (Modern Design) */}
          <div className="space-y-2">
            <label className="text-text font-medium">Event Type</label>

            <div className="relative">
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 pl-4 pr-10 bg-background border border-primary/40 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <option value="">Select event type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Custom Dropdown Arrow */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-sm">
                ▼
              </span>
            </div>
          </div>
          {/* Thumbnail URL */}
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-text font-medium mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnail"
              id="thumbnail"
              required
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full p-3 bg-background border text-text border-primary rounded-lg outline-primary
                         placeholder:text-text/50 transition"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-text font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              placeholder="Dhaka, Bangladesh"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-primary text-text rounded-lg outline-primary
                         placeholder:text-text/50 transition"
            />
          </div>

          {/* Event Date */}
          <div className="flex flex-col">
            <label htmlFor="eventDate" className="text-text font-medium mb-1">
              Event Date
            </label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date()}
              placeholderText="Select event date"
              className="w-full p-3 bg-background border text-text border-primary rounded-lg outline-primary
                         placeholder:text-text/50 transition cursor-pointer"
              dateFormat="MMMM d, yyyy"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-primary text-text font-semibold rounded-lg hover:bg-primary/80 transition"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default CreateEvent;