import { useState, useEffect } from "react";
import { HomeHeader } from "../components/Others/Header";
import { QuickTips } from "../components/home/QuickTips";
import { ArticleSection } from "../components/home/ArticleSetion";
import { supabase } from "../lib/supabase";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HomeHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="px-6 py-6 space-y-8">
        <QuickTips />

        <ArticleSection searchQuery={searchQuery} />
      </div>
    </div>
  );
}
