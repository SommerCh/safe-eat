// import { useNavigate } from "react-router";
// import { ChevronLeft, Heart, BookOpen } from "lucide-react";
// import { useProfile } from "../context/ProfileContext";
// import { ARTICLES } from "../components/articles/articleData";

// export function Favorites() {
//   const navigate = useNavigate();
//   const { favorites } = useProfile();

//   const favoritedArticles = ARTICLES.filter((article) =>
//     favorites.includes(article.id),
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">
//       <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-900 pr-0.5" />
//         </button>
//         <h1 className="text-xl font-bold text-gray-900">Mine favoritter</h1>
//       </div>

//       <div className="px-6 py-8">
//         {favoritedArticles.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
//               <Heart className="w-8 h-8 text-gray-200" />
//             </div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               Ingen favoritter endnu
//             </h2>
//             <p className="text-gray-500 text-sm mt-1 max-w-[200px]">
//               Gem vigtige artikler eller produkter for at finde dem her.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {favoritedArticles.map((article) => (
//               <div
//                 key={article.id}
//                 onClick={() =>
//                   navigate(`/article/${article.id}`, { state: { article } })
//                 }
//                 className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
//               >
//                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <BookOpen className="w-6 h-6 text-blue-900" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-gray-900 font-bold text-base truncate">
//                     {article.title}
//                   </h3>
//                   <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//                     {article.excerpt}
//                   </p>
//                 </div>
//                 <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router";
import { ChevronLeft, Heart, BookOpen, Search } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { ARTICLES } from "../components/articles/articleData";
import foodData from "../lib/dicData";

export function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useProfile();

  const favoritedArticles = ARTICLES.filter((article) =>
    favorites.includes(article.id),
  );

  const favoritedFoods = foodData.filter((food) => favorites.includes(food.id));

  const hasFavorites =
    favoritedArticles.length > 0 || favoritedFoods.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 pr-0.5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Mine favoritter</h1>
      </div>

      <div className="px-6 py-8 space-y-10">
        {!hasFavorites ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gray-200" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Ingen favoritter endnu
            </h2>
            <p className="text-gray-500 text-sm mt-1 max-w-[200px]">
              Gem vigtige artikler eller råvarer for at finde dem her.
            </p>
          </div>
        ) : (
          <>
            {favoritedFoods.length > 0 && (
              <section>
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
                  Gemte råvarer ({favoritedFoods.length})
                </h2>
                <div className="space-y-3">
                  {favoritedFoods.map((food) => {
                    const totalSynonyms = food.undertyper.reduce(
                      (acc, sub) => acc + sub.synonymer.length,
                      0,
                    );

                    return (
                      <div
                        key={food.id}
                        onClick={() => navigate("/guide")}
                        className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                      >
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Search className="w-5 h-5 text-blue-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 font-bold text-base truncate">
                            {food.kategori}
                          </h3>
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                            {totalSynonyms} synonymer gemt
                          </p>
                        </div>
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {favoritedArticles.length > 0 && (
              <section>
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
                  Gemte artikler ({favoritedArticles.length})
                </h2>
                <div className="space-y-4">
                  {favoritedArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => navigate(`/article/${article.id}`)}
                      className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform shadow-sm"
                    >
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-bold text-base truncate">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                      <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
