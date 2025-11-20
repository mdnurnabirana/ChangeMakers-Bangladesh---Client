import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import avatar from "../assets/avatar.png";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/event/${id}`);
        const data = await res.json();
        if (data.success) setEvent(data.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to fetch event data.");
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.info("Please log in first to join this event.");
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(`http://localhost:3000/event/join/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("You have successfully joined the event!");
      } else {
        toast.error(data.message || "Failed to join event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    } finally {
      setJoining(false);
    }
  };

  if (loading)
    return (
      <div className="pt-40">
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
      <Navbar />

      <section className="bg-background min-h-screen pt-24 px-4">
        <div className="max-w-[1296px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 bg-secondary/10 p-4 rounded-2xl drop-shadow-2xl">
            <div className="lg:w-1/2 w-full flex items-stretch">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="rounded-xl w-full object-cover shadow-lg h-full"
                style={{ maxHeight: "600px" }}
              />
            </div>

            <div className="lg:w-1/2 w-full flex flex-col justify-between space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                {event.title}
              </h1>

              <div className="space-y-2 text-text/80">
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
              </div>

              <div>
                <h2 className="text-2xl font-bold text-text mb-2">
                  Description
                </h2>
                <p className="text-text/70 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              <div>
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
              </div>

              <button
                onClick={handleJoinEvent}
                disabled={joining}
                className="mt-4 w-full py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary/80 transition"
              >
                {joining ? <Loading size={32} /> : "Join Event"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EventDetail;