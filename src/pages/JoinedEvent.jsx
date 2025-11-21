import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

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
        const res = await fetch(`http://localhost:3000/joined-events/${user.uid}`);
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

  if (events.length === 0) {
    return (
      <p className="text-center text-xl pt-20">
        You have not joined any events yet.
      </p>
    );
  }

  return (
    <section className="bg-background min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">Joined Events</h1>
        <p className="text-lg text-text/80 max-w-2xl mx-auto mb-4">Make Bangladesh Better Together</p>
      </div>

      <div className="max-w-[1296px] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-secondary/10 rounded-2xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold text-primary mb-2">{event.title}</h2>
            <p className="text-text/70 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-text/70 mb-1">
              <strong>Type:</strong> {event.type}
            </p>
            <p className="text-text/70">
              <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinedEvent;