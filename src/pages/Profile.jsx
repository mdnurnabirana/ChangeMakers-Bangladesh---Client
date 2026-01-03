import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import avatarFallback from "./../assets/avatar.png";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const {
    user,
    updateUserProfile,
    loading: userLoading,
  } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({ displayName, photoURL });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loading size={128} />
      </div>
    );
  }

  return (
    <section className="bg-background pt-20">
      <div className="max-w-2xl mx-4 sm:mx-auto py-8 px-6 bg-secondary/10 rounded-xl shadow-md ">
        <h1 className="text-text text-2xl font-bold mb-4">My Profile</h1>
        <div className="flex items-center gap-4 mb-6">
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL || avatarFallback}
            alt="Profile"
            className="w-18 h-18 rounded-full object-cover border"
          />
          <div>
            <p className="text-text text-lg font-semibold">
              {user.displayName || "User"}
            </p>
            <p className="text-sm text-text/80">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-text block font-medium mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="text-text/80 w-full border border-primary px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-text block font-medium mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter a valid photoURL"
              className="text-text/80 w-full border border-primary px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full px-4 py-2 bg-accent/80 text-text rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? <Loading size={22} /> : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;