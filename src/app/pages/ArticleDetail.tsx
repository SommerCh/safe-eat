import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Share, ChevronUp, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ARTICLES } from "../components/articles/articleData";
import { useProfile } from "../context/ProfileContext";

export function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { favorites, toggleFavorite } = useProfile();

  // 1. Vi opretter et anker til toppen af siden
  const topRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language?.startsWith("en") ? "en" : "da";
  const currentArticles = ARTICLES[currentLang] || [];

  const article = currentArticles.find((a) => a.id === Number(id));

  // --- DEN SKUDSIKRE SCROLL-LOGIK START ---
  useEffect(() => {
    // Funktion der tvinger scroll på alle tænkelige måder
    const forceScrollToTop = () => {
      // Standard window scroll
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Vores nye "Sledgehammer": Rul det specifikke usynlige element ind i skærmen
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };

    // Kør med det samme
    forceScrollToTop();

    // Kør igen efter 50ms, i tilfælde af at React var for langsom til at tegne skærmen
    const timeoutId = setTimeout(forceScrollToTop, 50);

    return () => clearTimeout(timeoutId);
  }, [id, location.pathname]); // Kører hver gang URL'en (eller ID'et) ændrer sig
  // --- DEN SKUDSIKRE SCROLL-LOGIK SLUT ---

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-slate-500 mb-4">
          {t("article_not_found", "Artiklen blev ikke fundet")}
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-semibold"
        >
          {t("go_back", "Gå tilbage")}
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(article.id);

  const relatedArticles = currentArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 4);

  if (relatedArticles.length < 9) {
    const fallbackRelated = currentArticles
      .filter((a) => a.id !== article.id && !relatedArticles.includes(a))
      .slice(0, 9 - relatedArticles.length);
    relatedArticles.push(...fallbackRelated);
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-[1px] opacity-0 pointer-events-none -z-10"
      />

      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-100">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(article.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              isFavorite ? "bg-red-50" : "bg-slate-100"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-700"
              }`}
            />
          </button>

          <button className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <Share className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      <div className="w-full h-72 relative">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
          {article.title}
        </h1>

        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
          {article.excerpt}
        </p>

        <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
          {article.content.paragraphs.map((para: string, index: number) => (
            <p key={index}>{para}</p>
          ))}

          <h2 className="text-xl font-semibold text-gray-900 pt-4">
            {article.content.heading}
          </h2>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
            <h3 className="font-bold text-blue-900 mb-2">
              {t("article_tip_heading", "Husk!")}
            </h3>
            <p className="text-sm text-blue-800">{article.content.tip}</p>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100 -mx-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 px-6">
              {t("you_might_also_like", "Andre læser også")}
            </h2>

            <div className="flex overflow-x-auto gap-4 pb-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {relatedArticles.map((relArticle) => (
                <div
                  key={relArticle.id}
                  onClick={() => navigate(`/article/${relArticle.id}`)}
                  className="w-[240px] flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col gap-3 cursor-pointer hover:bg-slate-50 active:scale-[0.98] transition-all group"
                >
                  <div className="w-full h-32 rounded-xl overflow-hidden relative">
                    <ImageWithFallback
                      src={relArticle.image}
                      alt={relArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col px-1 pb-1">
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1.5">
                      {relArticle.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {relArticle.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <ChevronUp className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
