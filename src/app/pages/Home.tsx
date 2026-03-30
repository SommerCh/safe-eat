import { useState } from "react";
import { HomeHeader } from "../components/others/Header";
import { QuickTips } from "../components/home/QuickTips";
import { ArticleSection } from "../components/home/ArticleSection";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gray-50">
      <HomeHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="px-6 py-6 space-y-8">
        <QuickTips />

        <ArticleSection searchQuery={searchQuery} />
      </div>
    </div>
  );
}
