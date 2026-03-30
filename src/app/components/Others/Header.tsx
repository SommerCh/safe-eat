import { useState, useEffect } from "react";
import { SearchBar } from "../ui/SearchBar";
import { supabase } from "../../lib/supabase";
import { useTranslation } from "react-i18next";

interface HomeHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function HomeHeader({ searchQuery, setSearchQuery }: HomeHeaderProps) {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.user_metadata?.full_name) {
        const name = user.user_metadata.full_name.split(" ")[0];
        setFirstName(name);
      }
    };

    getProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata?.full_name) {
        setFirstName(session.user.user_metadata.full_name.split(" ")[0]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return t("greeting_morning", "Godmorgen");
    if (hour >= 10 && hour < 14) return t("greeting_forenoon", "God formiddag");
    if (hour >= 14 && hour < 18)
      return t("greeting_afternoon", "God eftermiddag");
    return t("greeting_evening", "Godaften");
  };

  return (
    <div className="bg-white px-6 pt-[calc(env(safe-area-inset-top))] pb-6 sticky top-0 z-10 border-b border-slate-100">
      {" "}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {getGreeting()}
          {firstName ? ` ${firstName}` : ""}
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          {t("home_subtitle", "Find inspiration til din hverdag")}
        </p>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t(
          "search_placeholder",
          "Søg i artikler, tips og opskrifter...",
        )}
      />
    </div>
  );
}
