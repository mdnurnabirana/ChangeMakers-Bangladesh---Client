import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import Footer from "../components/Footer";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/event");
        const data = await res.json();

        if (data.success) {
          const today = new Date();

          const upcomingEvents = data.data
            .filter((event) => new Date(event.eventDate) >= today)
            .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)); 

          setEvents(upcomingEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <>
      <section className="bg-background min-h-screen">
        <div className="max-w-[1296px] mx-auto pt-20 px-4">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Upcoming Community Events
          </h1>

          {loading && (
            <div className="mt-10">
              <Loading size={128} />
            </div>
          )}

          {!loading && events.length === 0 && (
            <p className="text-2xl text-text/25 text-center mt-10">
              No upcoming events found.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pb-20">
            {events.map((event) => (
              <div
                key={event._id}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingEvent;
