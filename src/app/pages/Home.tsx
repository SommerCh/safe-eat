import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { HomeHeader } from "../components/Header";
import { QuickTips } from "../components/home/QuickTips";
import { ArticleSection } from "../components/home/ArticleSetion";
import { supabase } from "../lib/supabase";

export function Home() {
  const { profile, scanHistory } = useProfile();

  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");

  const hasProfile = profile.allergies.length > 0 || !!profile.diet;

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const name =
          user.user_metadata?.full_name || user.email?.split("@")[0] || "";
        const firstName = name.split(" ")[0];
        setUserName(firstName);
      }
    };
    fetchUser();
  }, []);

  const totalScans = scanHistory.length;
  const safeProducts = scanHistory.filter((s) => s.safe).length;
  totalScans > 0 ? Math.round((safeProducts / totalScans) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HomeHeader
        hasProfile={hasProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="px-6 py-6 space-y-8">
        <QuickTips />

        <ArticleSection searchQuery={searchQuery} />
      </div>
    </div>
  );
}
