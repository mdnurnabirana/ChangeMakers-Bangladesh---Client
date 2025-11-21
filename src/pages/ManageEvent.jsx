import { useEffect, useState, useContext } from "react";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaImage,
  FaTag,
  FaClock,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import { MdCancel } from "react-icons/md";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Recycling",
];

const ManageEvent = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    thumbnail: "",
    location: "",
  });
  const [eventDate, setEventDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/manage-event/${user.uid}`);
        const data = await res.json();
        if (data.success) setEvents(data.data || []);
        else toast.error(data.message || "Failed to load events");
      } catch {
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description || formData.description.trim().length < 250)
      newErrors.description = "Description must be at least 250 characters";
    if (!formData.type) newErrors.type = "Event type is required";
    if (!formData.thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!eventDate || eventDate <= new Date())
      newErrors.eventDate = "Date must be in the future";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openModal = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      type: event.type,
      thumbnail: event.thumbnail,
      location: event.location,
    });
    setEventDate(new Date(event.eventDate));
    setErrors({});
    document.getElementById("updateModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("updateModal").close();
    setCurrentEvent(null);
    setFormData({
      title: "",
      description: "",
      type: "",
      thumbnail: "",
      location: "",
    });
    setEventDate(null);
    setErrors({});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:3000/event/${currentEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventDate: eventDate.toISOString(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Event updated successfully!");
        setEvents((prev) =>
          prev.map((evt) =>
            evt._id === currentEvent._id
              ? { ...evt, ...formData, eventDate: eventDate.toISOString() }
              : evt
          )
        );
        closeModal();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await fetch(`http://localhost:3000/event/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setEvents((prev) => prev.filter((evt) => evt._id !== id));
          toast.success("Event deleted successfully");
        } else {
          toast.error(data.message || "Delete failed");
        }
      } catch {
        toast.error("Server error");
      }
    });
  };

  return (
    <section className="bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Manage Your Events
          </h1>
          <p className="text-lg text-text/80 max-w-2xl mx-auto">
            Update or remove your community events with ease
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center bg-background/80">
            <Loading/>
            <p className="mt-6 text-lg text-text animate-pulse">
              Loading your events...
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-background/90 rounded-3xl shadow-lg">
            <div className="w-32 h-32 mx-auto mb-8 bg-linear-to-r from-accent via-secondary to-primary rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-5xl text-text/90" />
            </div>
            <h2 className="text-3xl font-bold text-text/80 mb-4">No Events Yet</h2>
            <p className="text-lg text-text/70 max-w-md mx-auto">
              Start creating impactful community events and make a difference!
            </p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-background rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-linear-to-r from-accent via-secondary to-primary text-text">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Event</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Type</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Location</th>
                    <th className="px-6 py-5 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event._id} className="hover:bg-secondary/20 transition">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-primary"
                          />
                          <div>
                            <div className="font-bold text-text/80">{event.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-primary text-text/80">
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-text/80">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-primary" />
                          {new Date(event.eventDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-text/80">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary" />
                          {event.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => openModal(event)}
                            className="p-3 bg-primary text-text rounded-xl hover:bg-primary/80 transition shadow-md"
                            title="Edit"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="p-3 bg-red-600 text-text rounded-xl hover:bg-red-700 transition shadow-md"
                            title="Delete"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden grid gap-6 sm:grid-cols-2">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-background rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="aspect-video relative">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-primary/90 text-text">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-text/70 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-text/70">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-text/70" />
                        <span>
                          {new Date(event.eventDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-text/70" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openModal(event)}
                        className="flex-1 py-3 bg-primary text-text font-semibold rounded-xl hover:bg-primary/80 transition flex items-center justify-center gap-2"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex-1 py-3 bg-red-600 text-text font-semibold rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <dialog
          id="updateModal"
          className="modal"
        >
          <div className="modal-box p-0 max-w-4xl w-full bg-background rounded-3xl shadow-2xl overflow-hidden fixed inset-0 m-auto max-h-[95vh] flex flex-col">
            <div className="bg-linear-to-r from-primary via-secondary to-accent text-text p-6">
              <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <FaEdit className="text-3xl" />
                Update Event Details
              </h3>
              <p className="mt-2 opacity-90">Make changes and save your updated event</p>
            </div>

            <button
              onClick={closeModal}
              className="btn btn-circle btn-ghost text-text hover:bg-primary/20 absolute top-4 right-4 text-2xl z-10"
            >
              <MdCancel />
            </button>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-text/70 font-semibold mb-2">
                    <FaEdit className="text-text/90" />
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-primary/80 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition text-text/70"
                    placeholder="Enter event title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text/70 font-semibold mb-2">
                    <FaEdit className="text-text/90" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-5 py-4 border border-primary/80 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition text-text/70"
                    placeholder="Describe your event in detail (min. 250 characters)"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.description.length}/250+ characters
                  </div>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-text/70 font-semibold mb-2">
                      <FaTag className="text-text/70" />
                      Event Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-primary/80 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition text-text/70"
                    >
                      <option className="bg-background/80 text-text/70" value="">Choose event type</option>
                      {eventTypes.map((t) => (
                        <option className="bg-background/80 text-text/70" key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.type && <p className="text-red-500 text-sm mt-2">{errors.type}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-text/70 font-semibold mb-2">
                      <FaCalendarAlt className="text-text/90" />
                      Event Date
                    </label>
                    <DatePicker
                      selected={eventDate}
                      onChange={setEventDate}
                      minDate={new Date()}
                      className="w-full px-5 py-4 border border-primary/80 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition text-text/70"
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select future date"
                    />
                    {errors.eventDate && <p className="text-red-500 text-sm mt-2">{errors.eventDate}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-text/70 font-semibold mb-2">
                      <FaImage className="text-text/70" />
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-primary/80 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition text-text/70"
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.thumbnail && <p className="text-red-500 text-sm mt-2">{errors.thumbnail}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-text/70 font-semibold mb-2">
                      <FaMapMarkerAlt className="text-text/90" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-primary/80 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition text-text/70"
                      placeholder="City, State or Venue"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-8 py-4 bg-accent text-text font-semibold rounded-xl hover:bg-secondary transition shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 px-8 py-4 bg-linear-to-r from-primary to-accent text-white font-semibold rounded-xl hover:from-secondary hover:to-primary transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {updating ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Update Event"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      </div>
    </section>
  );
};

export default ManageEvent;