import { useState } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../ImageWithFallback";
import { ARTICLES, CATEGORIES } from "../articles/articleData";

interface ArticleSectionProps {
  searchQuery: string;
}

export function ArticleSection({ searchQuery }: ArticleSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const navigate = useNavigate();

  const filteredArticles = ARTICLES.filter((article) => {
    const categoryMatch =
      activeCategory === "Alle" || article.category === activeCategory;
    const searchMatch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Kategorier - Enkel og hurtig sortering */}
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm border
              ${
                activeCategory === cat
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-slate-500 hover:bg-slate-50 border-slate-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-end mb-5 px-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {activeCategory === "Alle"
              ? "Seneste nyt & guides"
              : activeCategory}
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1">
            {filteredArticles.length} artikler
          </span>
        </div>

        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/article/${article.id}`)}
              className="bg-white rounded-2xl p-3 shadow-sm border border-slate-50 flex gap-4 cursor-pointer hover:bg-slate-50 active:scale-[0.98] transition-all group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 py-1 flex flex-col">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1">
                  {article.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-slate-400 text-[10px] gap-1 font-bold">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-blue-900 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
