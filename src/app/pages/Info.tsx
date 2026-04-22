import { useState } from "react";
import { InfoHeader } from "../components/othersItems/Header";
import { QuickTips } from "../components/info/QuickTips";
import { ArticleSection } from "../components/info/ArticleSection";

export function Info() {
  const [searchQuery] = useState("");

  return (
    <div className="bg-gray-50">
      <InfoHeader />

      <div className="px-6 py-6 space-y-8">
        <QuickTips />

        <ArticleSection searchQuery={searchQuery} />
      </div>
    </div>
  );
}
