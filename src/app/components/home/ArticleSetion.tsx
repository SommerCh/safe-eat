import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "../ImageWithFallback";
import { ARTICLES, CATEGORIES } from "../articles/articleData";

interface ArticleSectionProps {
  searchQuery: string;
}

export function ArticleSection({ searchQuery }: ArticleSectionProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language?.startsWith("en") ? "en" : "da";
  const currentCategories = CATEGORIES[currentLang];
  const currentArticles = ARTICLES[currentLang] || [];

  const [activeCategory, setActiveCategory] = useState(currentCategories[0]);

  useEffect(() => {
    setActiveCategory(currentCategories[0]);
  }, [currentLang, currentCategories]);

  const filteredArticles = currentArticles.filter((article) => {
    const categoryMatch =
      activeCategory === currentCategories[0] ||
      article.category === activeCategory;
    const searchMatch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {currentCategories.map((cat) => (
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-1">
            {activeCategory === currentCategories[0]
              ? t("latest_news_and_guides", "Seneste nyt & guides")
              : activeCategory}
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1">
            {filteredArticles.length} {t("articles_count", "artikler")}
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
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}