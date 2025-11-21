import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const types = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Drive",
    "Recycling",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/event");
        const data = await res.json();

        if (data.success) {
          const today = new Date();
          let upcomingEvents = data.data.filter(
            (event) => new Date(event.eventDate) >= today
          );

          if (search) {
            const lowerSearch = search.toLowerCase();
            upcomingEvents = upcomingEvents.filter(
              (event) =>
                event.title.toLowerCase().includes(lowerSearch) ||
                event.location.toLowerCase().includes(lowerSearch)
            );
          }

          if (typeFilter) {
            upcomingEvents = upcomingEvents.filter(
              (event) => event.type === typeFilter
            );
          }

          upcomingEvents.sort(
            (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
          );
          setEvents(upcomingEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [search, typeFilter]);

  return (
    <section className="bg-background min-h-screen">
      <div className="max-w-[1296px] mx-auto pt-20 px-4">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          Upcoming Community Events
        </h1>
        <div className="flex justify-end my-6 w-full gap-4">
          <div className="flex items-center border border-accent rounded-lg px-3 py-2 bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary flex-1 max-w-[400px]">
            <FaSearch className="text-text/80 mr-2" />
            <input
              type="text"
              placeholder="Search by title or location"
              className="w-full outline-none bg-transparent text-text placeholder:text-text/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-accent rounded-lg px-3 py-2 bg-background text-text/80 shadow-sm focus:ring-2 focus:ring-primary w-40"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="mt-10 flex justify-center">
            <Loading size={128} />
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-20 bg-background/90 rounded-3xl shadow-lg mt-10 max-w-full mx-auto shadow-primary/20">
            <div className="w-32 h-32 mx-auto mb-8 bg-linear-to-r from-accent via-secondary to-primary rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-5xl text-text/90" />
            </div>
            <h2 className="text-3xl font-bold text-text/80 mb-4">
              No Upcoming Events
            </h2>
            <p className="text-lg text-text/70 max-w-md mx-auto">
              Start creating impactful community events and make a difference!
            </p>
          </div>
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
  );
};

export default UpcomingEvent;
