import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success(`Welcome back, ${result.user.displayName || "User"}!`);
        navigate(location.state?.from || "/");
        form.reset();
      })
      .catch((error) => {
        let msg;
        switch (error.code) {
          case "auth/invalid-email":
            msg = "Invalid email format.";
            break;
          case "auth/user-not-found":
            msg = "No account found with this email.";
            break;
          case "auth/wrong-password":
            msg = "Incorrect password. Try again.";
            break;
          default:
            msg = "Something went wrong. Please try again.";
        }
        toast.error(msg);
      });
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Save user info in backend
      const res = await fetch("https://changemakersbd.vercel.app/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL,
          role: "user",
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Welcome back, ${user.displayName || "User"}!`);
      } else {
        toast.error("Failed to save user to backend.");
      }

      navigate(location.state?.from || "/");
    } catch (error) {
      const msg =
        error.code === "auth/popup-closed-by-user"
          ? "Google sign-in was cancelled."
          : error.message || "Failed to sign in with Google. Try again.";
      toast.error(msg);
    }
  };

  return (
    <>
      <title>ChangeMakers Bangladesh - Login</title>
      <div className="bg-background">
        <div className="max-w-[1296px] mx-auto min-h-screen flex flex-col justify-center items-center px-4">
          <div className="flex flex-col items-center mb-10">
            <img src={logo} className="h-20 mb-3" alt="Logo" />
            <h1 className="text-4xl sm:text-5xl font-bold text-primary">
              User Login
            </h1>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-secondary w-full max-w-md p-8 rounded-2xl shadow-lg flex flex-col gap-6 border-2 border-primary text-text"
          >
            <input
              className="outline-none border-b-2 border-primary bg-transparent p-2 text-text placeholder:text-text"
              type="email"
              placeholder="Your Email"
              name="email"
              required
            />

            <div className="relative">
              <input
                className="outline-none border-b-2 border-primary bg-transparent p-2 w-full text-text placeholder:text-text"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
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

            <button
              type="submit"
              className="bg-primary text-text font-semibold py-2 rounded-xl border-2 border-primary hover:bg-opacity-90 transition-all"
            >
              Login Now
            </button>

            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex justify-center items-center gap-2 border border-primary rounded-xl py-2 hover:bg-primary/10 transition-all"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Logo"
                className="h-5 w-5"
              />
              <span className="text-text font-regular">Login with Google</span>
            </button>

            <p className="text-center text-text text-sm">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;