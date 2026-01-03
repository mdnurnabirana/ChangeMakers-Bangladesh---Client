import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "motion/react";
import { Link } from "react-router";

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
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-secondary/10 border border-accent/20 shadow-xl hover:shadow-2xl hover:shadow-accent/30 overflow-hidden transition-all duration-300 flex flex-col"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 flex flex-col grow">
                <h2 className="text-xl font-bold text-text line-clamp-2 min-h-14">
                  {event.title}
                </h2>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-text/60">{event.location}</p>
                  <span className="bg-primary/15 px-3 py-1 text-primary text-xs font-semibold rounded-full">
                    {event.type}
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-primary">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>

                <div className="mt-auto pt-5">
                  <Link
                    to={`/upcoming-events/${event._id}`}
                    className="w-full block text-center bg-primary text-background font-semibold py-2 rounded-lg hover:bg-primary/80 transition"
                  >
                    View Event Detail
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default JoinedEvent;