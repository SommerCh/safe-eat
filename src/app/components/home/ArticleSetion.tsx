import { useState } from "react";
import { Clock } from "lucide-react";
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
    const matchesCategory =
      activeCategory === "Alle" || article.category === activeCategory;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower) ||
      article.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const openArticle = (article: any) => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Kategorier i toppen */}
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm
              ${
                activeCategory === cat
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {searchQuery ? "Søgeresultater" : "Seneste nyt"}
          </h2>
        </div>

        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => openArticle(article)}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Tekst indhold */}
              <div className="flex-1 py-1 flex flex-col justify-center">
                <span className="text-sm font-medium text-blue-900 mb-1">
                  {article.category}
                </span>
                <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm gap-1 mt-auto">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-500">Ingen artikler fundet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
