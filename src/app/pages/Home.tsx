// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { useProfile } from "../context/ProfileContext";
// import { Lightbulb, ChevronRight, Award } from "lucide-react";
// import { HomeHeader } from "../components/Header";
// import { StatsOverview } from "../components/home/StatsOverview";
// import { QuickTips } from "../components/home/QuickTips";
// import { ArticleSection } from "../components/home/ArticleSetion";

// export function Home() {
//   const navigate = useNavigate();
//   const { profile, scanHistory } = useProfile();

//   const [searchQuery, setSearchQuery] = useState("");

//   const hasProfile = profile.allergies.length > 0 || !!profile.diet;

//   // Statistik
//   const totalScans = scanHistory.length;
//   const safeProducts = scanHistory.filter((s) => s.safe).length;
//   const unsafeProducts = totalScans - safeProducts;
//   const safePercentage =
//     totalScans > 0 ? Math.round((safeProducts / totalScans) * 100) : 0;

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       <HomeHeader
//         hasProfile={hasProfile}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       <div className="px-6 py-6 space-y-8">
//         {/* 2. Advarsel hvis profil mangler */}
//         {!hasProfile && (
//           <div
//             className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
//             onClick={() => navigate("/setup")}
//           >
//             <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
//             <div className="flex-1">
//               <h3 className="text-gray-900 font-semibold text-base">
//                 Glemt noget?
//               </h3>
//               <p className="text-gray-500 text-sm mt-0.5">
//                 Opsæt din profil for personlige anbefalinger
//               </p>
//             </div>
//             <ChevronRight className="w-5 h-5 text-gray-400" />
//           </div>
//         )}

//         {/* Statistik */}
//         <StatsOverview
//           totalScans={totalScans}
//           safeProducts={safeProducts}
//           unsafeProducts={unsafeProducts}
//           safePercentage={safePercentage}
//         />

//         {/* Tips */}
//         <QuickTips />

//         {/* Personlig box */}
//         {hasProfile && (
//           <section>
//             <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-5 shadow-lg text-white">
//               <div className="flex items-start gap-2 mb-1">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Award className="w-5 h-5" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg">Baseret på din profil</h3>
//                 </div>
//               </div>
//               <button
//                 className="w-full bg-white/10 text-white font-semibold py-3 px-4 rounded-xl text-sm hover:bg-white/20 transition-colors mt-2"
//                 onClick={() => navigate("/setup")}
//               >
//                 Opdater præferencer
//               </button>
//             </div>
//           </section>
//         )}

//         {/* Artikel-sektion! */}
//         <ArticleSection searchQuery={searchQuery} />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { HomeHeader } from "../components/Header";
import { StatsOverview } from "../components/home/StatsOverview";
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
  const unsafeProducts = totalScans - safeProducts;
  const safePercentage =
    totalScans > 0 ? Math.round((safeProducts / totalScans) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HomeHeader
        hasProfile={hasProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userName={userName}
      />

      <div className="px-6 py-6 space-y-8">
        <StatsOverview
          totalScans={totalScans}
          safeProducts={safeProducts}
          unsafeProducts={unsafeProducts}
          safePercentage={safePercentage}
        />

        <QuickTips />

        <ArticleSection searchQuery={searchQuery} />
      </div>
    </div>
  );
}
