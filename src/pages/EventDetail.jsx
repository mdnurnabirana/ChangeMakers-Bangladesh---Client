import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import avatar from "../assets/avatar.png";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [eventRes, joinedRes] = await Promise.all([
          fetch(`https://changemakersbd.vercel.app/event/${id}`),
          fetch(`https://changemakersbd.vercel.app/joined-event/${id}`),
        ]);
        const eventData = await eventRes.json();
        const joinedData = await joinedRes.json();
        if (eventData.success) setEvent(eventData.data);
        if (joinedData.success) {
          setJoinedUsers(joinedData.data);
          if (user)
            setAlreadyJoined(
              joinedData.data.some((u) => u.userId === user.uid)
            );
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch event data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, user]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("You must be logged in to join this event!");
      return;
    }
    setJoining(true);
    try {
      const response = await fetch(
        `https://changemakersbd.vercel.app/join-event/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid }),
        }
      );
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("You have successfully joined the event!");
        setJoinedUsers((prev) => [
          ...prev,
          { userId: user.uid, joinedAt: new Date() },
        ]);
        setAlreadyJoined(true);
      } else {
        toast.error(result.message || "Failed to join the event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setJoining(false);
    }
  };

  if (loading)
    return (
      <div className="pt-40 bg-background">
        <Loading size={128} />
      </div>
    );
  if (!event)
    return (
      <p className="text-center text-3xl pt-40 text-red-500">
        Event not found.
      </p>
    );

  return (
    <>
      <title>Event Detail</title>
      <section className="bg-background min-h-screen pt-24 px-4">
        <div className="max-w-[1296px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 bg-secondary/10 p-4 rounded-2xl drop-shadow-2xl">
            <div className="lg:w-1/2 w-full flex items-stretch">
              <motion.img
                src={event.thumbnail}
                alt={event.title}
                className="rounded-xl w-full object-cover shadow-lg h-full"
                style={{ maxHeight: "600px" }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            <div className="lg:w-1/2 w-full flex flex-col justify-between space-y-6">
              <motion.h1
                className="text-3xl sm:text-4xl font-bold text-primary mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {event.title}
              </motion.h1>

              <motion.div
                className="space-y-2 text-text/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Event Type:</strong> {event.type}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Joined:</strong> {joinedUsers.length}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-text mb-2">
                  Description
                </h2>
                <p className="text-text/70 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-text mb-2">
                  Created By
                </h2>
                <div className="flex items-center gap-4 bg-background p-3 rounded-xl shadow">
                  <img
                    src={event.creator?.profilePhoto || avatar}
                    alt={event.creator?.name || "Unknown"}
                    className="w-16 h-16 rounded-full object-cover outline-2 outline-secondary outline-offset-2"
                  />
                  <div>
                    <p className="text-lg font-semibold text-text">
                      {event.creator?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-text/60">
                      {event.creator?.email || "-"}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={handleJoinEvent}
                disabled={joining || alreadyJoined}
                className={`mt-4 w-full py-3 font-semibold rounded-lg transition ${
                  alreadyJoined
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-background hover:bg-primary/80"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {alreadyJoined ? (
                  "Joined Already"
                ) : joining ? (
                  <Loading size={32} />
                ) : (
                  "Join Event"
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetail;
