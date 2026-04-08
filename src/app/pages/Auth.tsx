import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { login, register } from "../utils/auth";
import { Button } from "../components/ui/button";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    if (!isLogin) {
      if (!name) {
        setError("Name is required.");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      // On success, redirect to home or progress
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8f2] font-sans relative overflow-hidden">
      {/* Subtle Background Pattern (Temple-inspired motif) */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%237a1c1c' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative w-full max-w-[1000px] flex flex-col md:flex-row bg-white rounded-3xl shadow-[0_10px_40px_rgba(122,28,28,0.1)] overflow-hidden m-4 min-h-[600px] z-10">
        
        {/* Left Side: Artwork & Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#7a1c1c] to-[#4a1111] p-10 flex flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Subtle overlay decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#d4af37] opacity-10 rounded-tr-full"></div>
          
          <div className="z-10 text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-[#f5f5dc]">
              Bharatanatyam Guru
            </h2>
            <p className="text-[#e2ca9c] text-sm md:text-base opacity-90">
              Master the divine art form with grace and devotion.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
          >
            {/* The generated Silhouette Image */}
            <div className="absolute inset-0 bg-[#d4af37] rounded-full opacity-10 blur-2xl animate-pulse"></div>
            <img 
              src="/dancer-silhouette.png" 
              alt="Bharatanatyam Silhouette" 
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            />
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#fdfcfa]">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm mx-auto"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#3b2f2f] mb-2 font-serif">
                  {isLogin ? "Welcome Back" : "Begin Your Journey"}
                </h1>
                <p className="text-[#8c7474] text-sm">
                  {isLogin 
                    ? "Enter your details to continue your practice." 
                    : "Create an account to track your progress and master the art."}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 border mx-auto max-w-sm border-red-200 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5a4848] uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#baa0a0]" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-[#e0d6d6] rounded-xl text-[#3b2f2f] placeholder-[#baa0a0] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c] focus:border-transparent bg-white transition-all"
                        placeholder="Aditi Sharma"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5a4848] uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#baa0a0]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-[#e0d6d6] rounded-xl text-[#3b2f2f] placeholder-[#baa0a0] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c] focus:border-transparent bg-white transition-all"
                      placeholder="aditi@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#5a4848] uppercase tracking-wider">Password</label>
                    {isLogin && (
                      <Link to="#" className="text-xs font-medium text-[#7a1c1c] hover:text-[#5a1515] transition-colors">
                        Forgot Password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#baa0a0]" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-[#e0d6d6] rounded-xl text-[#3b2f2f] placeholder-[#baa0a0] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c] focus:border-transparent bg-white transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#baa0a0] hover:text-[#7a1c1c] focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5a4848] uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#baa0a0]" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-[#e0d6d6] rounded-xl text-[#3b2f2f] placeholder-[#baa0a0] focus:outline-none focus:ring-2 focus:ring-[#7a1c1c] focus:border-transparent bg-white transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-6 mt-6 bg-[#7a1c1c] hover:bg-[#5a1515] text-white rounded-xl shadow-lg shadow-[#7a1c1c]/30 flex items-center justify-center space-x-2 transition-all font-medium text-base group"
                >
                  <span>{isLoading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}</span>
                  {!isLoading && (
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e0d6d6]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#fdfcfa] text-[#8c7474]">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-3 border border-[#e0d6d6] rounded-xl shadow-sm bg-white text-sm font-medium text-[#5a4848] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a1c1c] transition-all"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-[#5a4848]">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={toggleAuthMode}
                  className="font-bold text-[#7a1c1c] hover:text-[#d4af37] transition-colors"
                >
                  {isLogin ? "Sign up here" : "Sign in instead"}
                </button>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
