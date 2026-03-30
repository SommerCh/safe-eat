import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { AppleIcon, Chrome, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { supabase } from "../../app/lib/supabase";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import appLogo from "../../../assets/logotext.svg";

export function Onboarding() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
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

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setErrorMsg(t("auth.error_prefix") + error.message);
    } else {
      navigate("/setup");
    }

    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!rememberMe) {
      window.sessionStorage.setItem("useSessionStorage", "true");
    } else {
      window.sessionStorage.removeItem("useSessionStorage");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(t("auth.error_prefix") + error.message);
    } else {
      navigate("/home");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-6 pt-[calc(env(safe-area-inset-top))] pb-[calc(env(safe-area-inset-bottom)+32px)]">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <img src={appLogo} alt="SafeEat logo" className="w-full h-auto p-4" />

          <p className="text-center text-slate-500 max-w-xs">
            {t("auth.onboarding_subtitle")}
          </p>
        </div>

        <div className="space-y-4 pt-8 text-center">
          <Button
            disabled
            className="w-full h-14 bg-black/40 text-white/70 rounded-2xl text-base shadow-md cursor-not-allowed"
          >
            <AppleIcon className="w-5 h-5 mr-2" />
            {t("auth.login_apple")}
          </Button>

          <Button
            variant="outline"
            disabled
            className="w-full h-14 border-2 border-slate-100 text-slate-400 rounded-2xl text-base shadow-sm cursor-not-allowed"
          >
            <Chrome className="w-5 h-5 mr-2" />
            {t("auth.login_google")}
          </Button>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            {t("auth.social_coming_soon")}
          </p>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 italic">
                {t("auth.use_email_instead")}
              </span>
            </div>
          </div>

          <form
            onSubmit={isLogin ? handleLogin : handleSignUp}
            className="space-y-4 text-left"
          >
            {!isLogin && (
              <div className="relative animate-in slide-in-from-top-2 fade-in duration-300">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("auth.name_placeholder")}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.email_placeholder")}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={isLogin ? undefined : 6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isLogin
                    ? t("auth.password_placeholder_login")
                    : t("auth.password_placeholder_signup")
                }
                className="w-full h-14 pl-12 pr-12 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {isLogin && (
              <div className="flex items-center pt-1 px-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-slate-600 cursor-pointer select-none"
                >
                  {t("auth.remember_me")}
                </label>
              </div>
            )}

            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-black text-white hover:bg-slate-800 rounded-2xl text-base shadow-md disabled:opacity-50"
            >
              {loading
                ? isLogin
                  ? t("auth.logging_in")
                  : t("auth.creating_account")
                : isLogin
                ? t("auth.login_button")
                : t("auth.create_profile_button")}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600">
            {isLogin
              ? t("auth.no_account_prompt")
              : t("auth.have_account_prompt")}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg("");
              }}
              className="font-semibold text-slate-900 hover:text-black ml-1"
            >
              {isLogin ? t("auth.signup_link") : t("auth.login_link")}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 pt-4 px-6 leading-relaxed">
          {t("auth.terms_agreement_prefix")}
          <Link
            to="/terms"
            className="underline underline-offset-2 hover:text-slate-600 ml-1"
          >
            {t("auth.terms_agreement_link")}
          </Link>
        </p>
      </div>
    </div>
  );
}
