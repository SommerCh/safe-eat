import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, X, Plus, ChevronLeft } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import foodData, { type FoodCategory } from "../lib/foodData";
import { SearchBar } from "../components/ui/SearchBar";

type SortOption = "alphabetical" | "favorites" | "common";

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  if (!highlight.trim()) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-blue-100 text-blue-900 rounded-[2px]">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
export function Dictionary() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("common");

  const { favorites, toggleFavorite, profile, toggleNoListItem, setProfile } =
    useProfile();
  const nolist = profile.nolist || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleToggleAll = (synonyms: string[]) => {
    const lowerSynonyms = synonyms.map((s) => s.toLowerCase());
    const allSelected = lowerSynonyms.every((s) => nolist.includes(s));

    const currentList = profile.nolist || [];

    if (allSelected) {
      setProfile({
        ...profile,
        nolist: currentList.filter(
          (item: string) => !lowerSynonyms.includes(item),
        ),
      });
    } else {
      const newItems = lowerSynonyms.filter((s) => !currentList.includes(s));
      setProfile({
        ...profile,
        nolist: [...currentList, ...newItems],
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Opdateret Header - Matcher ProfileSettings 1:1 */}
      <div className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Råvareguide
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Slå skjulte ingredienser op
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 border border-slate-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 pr-0.5" />
          </button>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Søg f.eks. efter E-numre..."
        />
      </div>

      <div className="px-6 py-8 space-y-10 max-w-md mx-auto">
        <section>
          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {(["common", "alphabetical", "favorites"] as SortOption[]).map(
              (option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`flex-1 py-2.5 text-[11px] uppercase tracking-wider font-bold rounded-xl transition-all ${
                    sortBy === option
                      ? "bg-white shadow-sm text-slate-900 border border-slate-200/50"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {option === "common" && "Vigtigste"}
                  {option === "alphabetical" && "A-Å"}
                  {option === "favorites" && "Gemte"}
                </button>
              ),
            )}
          </div>
        </section>

        <div className="space-y-8">
          {filteredData.map((item: FoodCategory) => {
            const isFavorite = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight leading-none pt-1">
                    <HighlightedText
                      text={item.kategori}
                      highlight={searchTerm}
                    />
                  </h3>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1 -mt-1 group"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-slate-200 group-hover:text-slate-300"
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-10">
                  {item.undertyper.map((sub, subIdx) => {
                    const allSelected = sub.synonymer.every((s) =>
                      nolist.includes(s.toLowerCase()),
                    );

                    return (
                      <div key={subIdx}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <HighlightedText
                              text={sub.titel}
                              highlight={searchTerm}
                            />
                          </span>
                          <button
                            onClick={() => handleToggleAll(sub.synonymer)}
                            className="text-slate-400 hover:text-slate-900 transition-colors p-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                          >
                            {allSelected ? (
                              <>
                                Fjern alle <X className="w-3.5 h-3.5 ml-0.5" />
                              </>
                            ) : (
                              <>
                                Tilføj alle{" "}
                                <Plus className="w-3.5 h-3.5 ml-0.5" />
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {sub.synonymer.map((syn, idx) => {
                            const isSelected = nolist.includes(
                              syn.toLowerCase(),
                            );
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleNoListItem(syn)}
                                className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium flex items-center gap-1.5
                                  ${
                                    isSelected
                                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                                  }`}
                              >
                                <HighlightedText
                                  text={syn}
                                  highlight={searchTerm}
                                />
                                {isSelected ? (
                                  <X className="w-4 h-4" />
                                ) : (
                                  <Plus className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm font-medium">
                Vi fandt desværre intet der matchede din søgning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
