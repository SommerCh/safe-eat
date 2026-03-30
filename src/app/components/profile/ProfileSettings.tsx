import { useState, useEffect } from "react";
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
  Globe, // Tilføjet til sprog-ikon
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import appLogo from "../../../../assets/logo.png";

export function ProfileSettings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Tilføjet i18n her
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const userEmail = user.email || "";
        setEmail(userEmail);
        setInitialEmail(userEmail);
        setName(user.user_metadata?.full_name || "");

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

  // Funktion til at skifte sprog
  const toggleLanguage = () => {
    const newLang = i18n.language === "da" ? "en" : "da";
    i18n.changeLanguage(newLang);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const updates: any = {
      data: { full_name: name },
    };

    if (email !== initialEmail) {
      updates.email = email;
    }

    if (password.length >= 6) {
      updates.password = password;
    }

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      setMessage({
        text: t("profile.error", "Fejl: ") + error.message,
        type: "error",
      });
    } else {
      setMessage({
        text: t("profile.update_success", "Din profil er blevet opdateret!"),
        type: "success",
      });
      setInitialEmail(email);
      setPassword("");

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setName(user.user_metadata?.full_name || "");
      }
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      t("profile.delete_confirm", "Er du helt sikker på, at du vil slette din profil? Dette kan ikke fortrydes.")
    );

    if (confirmDelete) {
      const { error } = await supabase.rpc("delete_user");
      if (error) {
        console.error("Slette-fejl:", error);
        alert(t("profile.delete_error", "Kunne ikke slette bruger"));
        return;
      }
      await supabase.auth.signOut();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white "> 
      <div className="bg-white px-6 pt-6 pb-6 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            {t("profile.settings_title", "Indstillinger")}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {t("profile.settings_subtitle", "Administrer din konto og sikkerhed")}
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
        {/* Enkel sprogvælger-knap tilføjet her */}
        <button 
          onClick={toggleLanguage}
          className="w-full mb-8 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-between px-4"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {i18n.language === "da" ? "Dansk" : "English"}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t("profile.change_lang", "Skift")}
          </span>
        </button>

        {isPremium && (
          <div className="flex items-center gap-2 mb-6 ml-1">
            <img src={appLogo} alt="SafeEat logo" className="w-5 h-5 object-contain" />
            <span className="text-sm font-bold text-slate-700">
              {t("profile.premium_user", "Safe Eat Pro user")}
            </span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {t("profile.label_name", "Navn")}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("profile.placeholder_name", "Indtast dit navn")}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {t("profile.label_email", "E-mailadresse")}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {t("profile.label_password", "Ny adgangskode")}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("profile.placeholder_password_change", "Skriv kun for at ændre")}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            }`}>
              {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-slate-950 text-white hover:bg-black rounded-2xl text-base font-bold shadow-sm transition-all active:scale-[0.98]"
          >
            {loading ? t("profile.btn_saving", "Gemmer...") : t("profile.btn_save_changes", "Gem ændringer")}
          </Button>
        </form>

        <div className="pt-8 mt-12 space-y-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-14 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-2xl text-base font-semibold transition-all active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5" />
            {t("profile.btn_logout", "Log ud")}
          </button>

          <button
            type="button"
            onClick={handleDeleteProfile}
            className="w-full flex items-center justify-center gap-2 h-14 bg-white border-2 border-red-50 text-red-600 hover:bg-red-50 rounded-2xl text-base font-semibold transition-all active:scale-[0.98]"
          >
            <Trash2 className="w-5 h-5" />
            {t("profile.btn_delete_profile", "Slet profil")}
          </button>
        </div>
      </div>
    </div>
  );
}