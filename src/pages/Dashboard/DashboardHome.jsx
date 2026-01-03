import { useContext } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../provider/AuthProvider";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">
        Welcome back, {user?.displayName || "User"} 👋
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>

        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Members</h3>
          <p className="text-3xl font-bold text-primary">240</p>
        </div>

        <div className="rounded-xl bg-secondary/80 p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Upcoming</h3>
          <p className="text-3xl font-bold text-primary">3</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;