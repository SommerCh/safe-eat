import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { AppleIcon, Chrome, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "../../app/lib/supabase";

export function Onboarding() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Send til Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg("Fejl: " + error.message);
    } else {
      console.log("Bruger oprettet!", data);
      navigate("/setup");
    }

    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg("Fejl: " + error.message);
    } else {
      navigate("/home");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Icon */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            SafeEat
          </h1>
          <p className="text-center text-slate-500 max-w-xs">
            Scan ingredienser og hold dig sikker med din personlige madprofil
          </p>
        </div>

        {/* Social Buttons */}
        <div className="space-y-4 pt-8">
          <Button className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-2xl text-base shadow-md">
            <AppleIcon className="w-5 h-5 mr-2" />
            Log ind med Apple
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl text-base shadow-md"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Log ind med Google
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                {isLogin
                  ? "eller log ind med e-mail"
                  : "eller opret med e-mail"}
              </span>
            </div>
          </div>

          <form
            onSubmit={isLogin ? handleLogin : handleSignUp}
            className="space-y-4"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-mailadresse"
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={isLogin ? undefined : 6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isLogin ? "Din adgangskode" : "Adgangskode (min. 6 tegn)"
                }
                className="w-full h-14 pl-12 pr-12 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Husk mig */}
            {isLogin && (
              <div className="flex items-center pt-1 px-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
                >
                  Husk mig på denne enhed
                </label>
              </div>
            )}

            {/* Fejlbesked */}
            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-blue-500 text-white hover:bg-blue-600 rounded-2xl text-base shadow-md disabled:opacity-50"
            >
              {loading
                ? isLogin
                  ? "Logger ind..."
                  : "Opretter..."
                : isLogin
                  ? "Log ind"
                  : "Opret profil"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            {isLogin
              ? "Har du ikke en bruger? "
              : "Har du allerede en bruger? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {isLogin ? "Opret profil" : "Log ind"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 pt-4">
          Ved at fortsætte accepterer du vores vilkår og betingelser
        </p>
      </div>
    </div>
  );
}
