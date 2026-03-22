import { useState } from "react";
import { Heart, Search } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import foodData, { type FoodCategory } from "../lib/foodData";

type SortOption = "alphabetical" | "favorites" | "common";

export function Dictionary() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("common");
  const { favorites, toggleFavorite } = useProfile();

  const filteredData = foodData
    .filter((item: FoodCategory) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesCategory = item.kategori.toLowerCase().includes(searchLower);
      const matchesSubs = item.undertyper.some(
        (sub) =>
          sub.titel.toLowerCase().includes(searchLower) ||
          sub.synonymer.some((syn) => syn.toLowerCase().includes(searchLower)),
      );
      return matchesCategory || matchesSubs;
    })
    .sort((a, b) => {
      if (sortBy === "favorites") {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
      }
      if (sortBy === "common") {
        if (a.isCommon && !b.isCommon) return -1;
        if (!a.isCommon && b.isCommon) return 1;
      }
      return a.kategori.localeCompare(b.kategori);
    });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="px-6 py-6 space-y-6">
        <section>
          <div className="flex justify-between items-end mb-5 px-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Råvareguide
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1">
              {filteredData.length} sektioner
            </span>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="text"
                placeholder="Søg i guiden..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-100 shadow-sm focus:outline-none bg-white text-sm font-bold text-slate-900 placeholder:text-slate-300"
              />
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {(["common", "alphabetical", "favorites"] as SortOption[]).map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm border
                    ${
                      sortBy === option
                        ? "bg-blue-900 text-white border-blue-900"
                        : "bg-white text-slate-500 border-slate-100"
                    }`}
                  >
                    {option === "common" && "Almindelige"}
                    {option === "alphabetical" && "A-Å"}
                    {option === "favorites" && "Gemte"}
                  </button>
                ),
              )}
            </div>
          </div>
        </section>

        <div className="space-y-6">
          {filteredData.map((item: FoodCategory) => {
            const isAdded = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none pt-2">
                    {item.kategori}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1 group"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${isAdded ? "text-red-500 fill-red-500" : "text-slate-200 group-hover:text-slate-300"}`}
                    />
                  </button>
                </div>

                <div className="space-y-6">
                  {item.undertyper.map((sub, subIdx) => (
                    <div key={subIdx}>
                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-3 block">
                        {sub.titel}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {sub.synonymer.map((syn, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-slate-100 uppercase tracking-tight"
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
