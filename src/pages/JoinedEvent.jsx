import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "motion/react";

const JoinedEvent = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchJoinedEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://changemakersbd.vercel.app/joined-events/${user.uid}`
        );
        const data = await res.json();
        if (data.success) {
          setEvents(data.data || []);
        } else {
          toast.error(data.message || "Failed to fetch joined events.");
        }
      } catch (err) {
        console.error("Error fetching joined events:", err);
        toast.error("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loading size={128} />
      </div>
    );
  }

  return (
    <>
      <title>Joined Events</title>

      <motion.div
        className="max-w-7xl mx-auto mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-semibold text-text mb-2">Joined Events</h1>
        <p className="text-primary mb-6 font-semibold">
          Make Bangladesh Better Together
        </p>
      </motion.div>

      {events.length === 0 && (
        <motion.div
          className="flex justify-center items-center px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center py-20 bg-background/90 rounded-3xl shadow-lg max-w-[1296px] w-full shadow-primary/20">
            <div className="w-32 h-32 mx-auto mb-8 bg-linear-to-r from-accent via-secondary to-primary rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-5xl text-text/90" />
            </div>
            <h2 className="text-3xl font-bold text-text/80 mb-4">
              No Joined Events
            </h2>
            <p className="text-lg text-text/70 max-w-md mx-auto">
              You haven't joined any events yet. Explore upcoming community
              events and get involved!
            </p>
          </div>
        </motion.div>
      )}

      {events.length > 0 && (
        <div className="max-w-[1296px] mx-auto grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
              className="bg-secondary/10 rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold text-primary mb-2">
                {event.title}
              </h2>
              <p className="text-text/70 mb-1">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-text/70 mb-1">
                <strong>Type:</strong> {event.type}
              </p>
              <p className="text-text/70">
                <strong>Date:</strong>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default JoinedEvent;