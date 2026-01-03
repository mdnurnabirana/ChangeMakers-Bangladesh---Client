import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInUser, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    signInUser(email, password)
      .then((result) => {
        toast.success(`Welcome back, ${result.user.displayName || "User"}!`);
        navigate(location.state?.from || "/");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        toast.error("Invalid email or password.");
      });
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithGoogle();
      toast.success(`Welcome back, ${result.user.displayName || "User"}!`);
      navigate(location.state?.from || "/");
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  const fillDemo = (demo) => {
    if (demo === 1) {
      setEmail("userone@gmail.com");
    } else {
      setEmail("usertwo@gmail.com");
    }
    setPassword("1234Aa");
  };

  return (
    <>
      <title>ChangeMakers Bangladesh - Login</title>

      <div className="bg-background min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md">

          <div className="flex flex-col items-center mb-8">
            <img src={logo} className="h-20 mb-3" alt="Logo" />
            <h1 className="text-4xl font-bold text-primary">User Login</h1>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-secondary p-8 rounded-2xl shadow-lg flex flex-col gap-6 border-2 border-primary"
          >

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fillDemo(1)}
                className="bg-background flex-1 py-2 rounded-xl border border-accent font-semibold hover:bg-background/70 transition"
              >
                Demo Account 1
              </button>
              <button
                type="button"
                onClick={() => fillDemo(2)}
                className="bg-background flex-1 py-2 rounded-xl border border-primary font-semibold hover:bg-background/70 transition"
              >
                Demo Account 2
              </button>
            </div>

            <input
              className="outline-none border-b-2 border-primary bg-transparent p-2"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                className="outline-none border-b-2 border-primary bg-transparent p-2 w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            <button
              type="submit" disabled={loading}
              className="bg-primary border-background font-semibold py-2 rounded-xl hover:opacity-90 transition"
            >
              {loading ? <Loading size={22}/>: "Login Now"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignin}
              className="bg-background flex justify-center items-center gap-2 border border-primary rounded-xl py-2 hover:bg-background/70 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Login with Google
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary font-semibold">
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