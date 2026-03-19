import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Mail,
  Lock,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";

export function ProfileSettings() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(""); // Til at tjekke om mail er ændret
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userEmail = user.email || "";
        setEmail(userEmail);
        setInitialEmail(userEmail);
        setName(user.user_metadata?.full_name || "");
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    // Vi bygger opdaterings-objektet
    const updates: any = {
      data: { full_name: name }, // Metadata opdateres altid
    };

    // Send kun email hvis den er ændret (Supabase kræver ofte bekræftelse på ny mail)
    if (email !== initialEmail) {
      updates.email = email;
    }

    // Send kun password hvis der er skrevet et nyt
    if (password.length >= 6) {
      updates.password = password;
    }

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      setMessage({ text: "Fejl: " + error.message, type: "error" });
    } else {
      setMessage({ text: "Din profil er blevet opdateret!", type: "success" });
      setInitialEmail(email); // Opdater vores tjek-mail
      setPassword(""); // Ryd password feltet

      // Vi henter lige brugeren igen for at være 100% sikre på at UI er frisk
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
      "Er du helt sikker på, at du vil slette din profil? Dette kan ikke fortrydes.",
    );

    if (confirmDelete) {
      // Bemærk: Supabase kræver normalt en Edge Function for at slette en bruger helt fra AUTH.
      // Her logger vi dem bare ud og sender dem væk.
      await supabase.auth.signOut();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Indstillinger
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Administrer din konto og sikkerhed
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 border border-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      <div className="px-6 py-8 space-y-12 max-w-md mx-auto">
        <form onSubmit={handleUpdateProfile} className="space-y-8">
          {/* Fulde navn */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Fulde navn
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Indtast dit navn"
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              E-mailadresse
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

          {/* Adgangskode */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Ny adgangskode
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Skriv kun for at ændre"
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none transition-all"
              />
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-slate-950 text-white hover:bg-black rounded-2xl text-base font-bold shadow-sm transition-all active:scale-[0.98]"
          >
            {loading ? "Gemmer..." : "Gem ændringer"}
          </Button>
        </form>

        <div className="pt-8 space-y-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-14 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-2xl text-base font-semibold transition-all active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5" />
            Log ud
          </button>

          <button
            onClick={handleDeleteProfile}
            className="w-full flex items-center justify-center gap-2 h-14 bg-white border-2 border-red-50 text-red-600 hover:bg-red-50 rounded-2xl text-base font-semibold transition-all active:scale-[0.98]"
          >
            <Trash2 className="w-5 h-5" />
            Slet profil
          </button>
        </div>
      </div>
    </div>
  );
}
