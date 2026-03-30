import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  User,
  Mail,
  Lock,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  LogOut,
  Globe,
  ArrowRight,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import appLogo from "../../../../assets/logo.png";

export function ProfileSettings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialName, setInitialName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isPremium, setIsPremium] = useState(false);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const userEmail = user.email || "";
        const fullName = user.user_metadata?.full_name || "";
        setEmail(userEmail);
        setInitialEmail(userEmail);
        setName(fullName);
        setInitialName(fullName);

        const { data } = await supabase
          .from("profiles")
          .select("is_premium")
          .eq("id", user.id)
          .single();

        if (data) {
          setIsPremium(data.is_premium);
        }
      }
    };
    fetchUser();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith("da") ? "en" : "da";
    i18n.changeLanguage(newLang).then(() => {
      localStorage.setItem("i18nextLng", newLang);
    });
  };

  const autoSaveField = async (type: "name" | "email") => {
    if (type === "name" && name === initialName) return;
    if (type === "email" && email === initialEmail) return;

    setMessage({ text: "", type: "" });
    const updates: any = {};

    if (type === "name") updates.data = { full_name: name };
    if (type === "email") updates.email = email;

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      setMessage({ text: t("profile.error") + error.message, type: "error" });
      if (type === "name") setName(initialName);
      if (type === "email") setEmail(initialEmail);
    } else {
      setMessage({ text: t("profile.update_success"), type: "success" });
      if (type === "name") setInitialName(name);
      if (type === "email") setInitialEmail(email);
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    }
  };

  const handlePasswordUpdate = async () => {
    if (password.length < 6) return;
    setLoading(true);
    setMessage({ text: "", type: "" });

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage({ text: t("profile.error") + error.message, type: "error" });
    } else {
      setMessage({ text: t("profile.update_success"), type: "success" });
      setPassword("");
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(t("profile.delete_confirm"));
    if (confirmDelete) {
      const { error } = await supabase.rpc("delete_user");
      if (error) {
        alert(t("profile.delete_error"));
        return;
      }
      await supabase.auth.signOut();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white px-6 pt-6 pb-6 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            {t("profile.settings_title")}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {t("profile.settings_subtitle")}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
        </button>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto">
        <button
          onClick={toggleLanguage}
          className="w-full mb-8 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-between px-4"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {i18n.language.startsWith("da") ? "Dansk" : "English"}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t("profile.change_lang")}
          </span>
        </button>

        {isPremium && (
          <div className="flex items-center gap-2 mb-8 ml-1">
            <img
              src={appLogo}
              alt="SafeEat logo"
              className="w-5 h-5 object-contain"
            />
            <span className="text-sm font-bold text-slate-700">
              {t("profile.premium_user")}
            </span>
          </div>
        )}

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {t("profile.label_name")}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => autoSaveField("name")}
                placeholder={t("profile.placeholder_name")}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {t("profile.label_email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => autoSaveField("email")}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {t("profile.label_password")}
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("profile.placeholder_password")}
                className="w-full h-14 pl-12 pr-28 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
              {password.length >= 6 && (
                <button
                  onClick={handlePasswordUpdate}
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-black transition-all animate-in fade-in zoom-in duration-200"
                >
                  {loading ? "..." : t("profile.btn_update", "Opdater")}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}
        </div>

        <div className="pt-8 mt-12 space-y-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-14 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-2xl text-base font-semibold transition-all active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5" />
            {t("profile.btn_logout")}
          </button>

          <button
            type="button"
            onClick={handleDeleteProfile}
            className="w-full flex items-center justify-center gap-2 h-14 bg-white border-2 border-red-50 text-red-600 hover:bg-red-50 rounded-2xl text-base font-semibold transition-all active:scale-[0.98]"
          >
            <Trash2 className="w-5 h-5" />
            {t("profile.btn_delete_profile")}
          </button>
        </div>
      </div>
    </div>
  );
}
