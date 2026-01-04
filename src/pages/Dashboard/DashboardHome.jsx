import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../provider/AuthProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalEvents: 0,
    joinedEvents: 0,
    upcomingEvents: 0,
    eventTypes: {},
  });
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoadingData(true);

        const resEvents = await fetch(
          `https://changemakersbd.vercel.app/manage-event/${user.uid}`
        );
        const createdEvents = (await resEvents.json()).data || [];

        const resJoined = await fetch(
          `https://changemakersbd.vercel.app/joined-events/${user.uid}`
        );
        const joinedEvents = (await resJoined.json()).data || [];

        const today = new Date();
        const upcoming = createdEvents.filter(
          (e) => new Date(e.eventDate) >= today
        );

        const typeCount = {};
        createdEvents.forEach((e) => {
          if (e.type) typeCount[e.type] = (typeCount[e.type] || 0) + 1;
        });

        setStats({
          totalEvents: createdEvents.length,
          joinedEvents: joinedEvents.length,
          upcomingEvents: upcoming.length,
          eventTypes: typeCount,
        });

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const bar = months.map((month, i) => {
          const createdCount = createdEvents.filter(
            (e) => new Date(e.eventDate).getMonth() === i
          ).length;
          const joinedCount = joinedEvents.filter(
            (e) => new Date(e.eventDate).getMonth() === i
          ).length;
          return { month, Created: createdCount, Joined: joinedCount };
        });
        setBarData(bar);

        const pie = Object.entries(typeCount).map(([type, value]) => ({
          name: type,
          value,
        }));
        setPieData(pie);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">
        Welcome back, {user?.displayName || "User"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Total Created Events</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalEvents}</p>
        </div>
        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Joined Events</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.joinedEvents}
          </p>
        </div>
        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.upcomingEvents}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm flex flex-col">
          <h3 className="font-semibold mb-2">Events Per Month</h3>
          {barData.every((d) => d.Created === 0 && d.Joined === 0) ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 italic">
              No events found for this chart.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Created" fill="#0088FE" />
                <Bar dataKey="Joined" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm flex flex-col">
          <h3 className="font-semibold mb-2">Event Types Distribution</h3>
          {pieData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 italic">
              No event types found.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;