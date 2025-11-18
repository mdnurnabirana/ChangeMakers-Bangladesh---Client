import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate Image URL
  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter.");
      return;
    }

    if (photo && !isValidUrl(photo)) {
      toast.error("Please provide a valid image URL.");
      return;
    }

    // Create user in Firebase
    createUser(email, password)
      .then((result) => {
        // Update profile
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(async () => {
            // Save user in backend
            try {
              const res = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  firebaseUid: result.user.uid,
                  name: name,
                  email: email,
                  profilePhoto: photo,
                  role: "user",
                  createdAt: new Date().toISOString(),
                }),
              });
              const data = await res.json();
              if (!data.success) {
                toast.error("Failed to save user in backend.");
              }
            } catch (err) {
              console.error(err);
              toast.error("Backend server error.");
            }

            // Logout and redirect
            logOut().then(() => {
              toast.success("Registration successful! Please login.");
              navigate("/auth/login");
              form.reset();
            });
          })
          .catch((err) => {
            toast.error("Profile update failed.");
            setError(err.message);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else {
          toast.error("Registration failed.");
        }
        setError(error.message);
      });
  };

  return (
    <>
      <title>ChangeMakers Bangladesh - Register</title>

      <div className="max-w-[1296px] mx-auto min-h-screen flex flex-col justify-center items-center px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} className="h-20 mb-3" alt="Logo" />
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">
            Create Account
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="bg-secondary w-full max-w-md p-8 rounded-2xl shadow-lg flex flex-col gap-6 border-2 border-primary text-text"
        >
          {/* Full Name */}
          <input
            className="outline-none border-b-2 border-primary bg-transparent p-2 text-text placeholder:text-gray-500"
            type="text"
            placeholder="Full Name"
            name="name"
            required
          />

          {/* Email */}
          <input
            className="outline-none border-b-2 border-primary bg-transparent p-2 text-text placeholder:text-gray-500"
            type="email"
            placeholder="Your Email"
            name="email"
            required
          />

          {/* Photo URL */}
          <input
            className="outline-none border-b-2 border-primary bg-transparent p-2 text-text placeholder:text-gray-500"
            type="text"
            placeholder="Photo URL (optional)"
            name="photo"
          />

          {/* Password */}
          <div className="relative">
            <input
              className="outline-none border-b-2 border-primary bg-transparent p-2 w-full text-text placeholder:text-gray-500"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-text hover:opacity-80"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-primary text-white font-semibold py-2 rounded-xl border-2 border-primary hover:bg-opacity-90 transition-all"
          >
            Register
          </button>

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          {/* Login Link */}
          <p className="text-center text-text text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;